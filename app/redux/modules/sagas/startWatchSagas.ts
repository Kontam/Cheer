import { call, put, takeEvery, select } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { push } from 'connected-react-router';
import { getUnixTime } from 'date-fns';
import {
  ChannelHistories,
  RootState,
  SlackChannelInfo,
  TokenInfo,
} from '../types';
import {
  ChannelInfoFromSlack,
  removeWebClientInstance,
} from '../../../modules/util/requests/webClient';
import {
  requestSlackChannelInfoSuccess,
  requestSlackChannelInfoFail,
  requestSlackChannelInfo,
} from '../api/slackChannelInfo';
import {
  writeChannelHistoriesToStorage,
  overflowHistory,
} from '../app/channelHistories';
import { makeWatchWindow } from '../../effects/window';
import { watchNewChannel } from '../app/messageQueue';
import appConst from '../../../modules/constants/appConst';
import { setLastRequestTime } from '../app/requestInfo';
import { routes } from '../../../modules/constants/routes';
import { showAlert } from '../common/alert';
import { requestMessagesAPIFail } from '../api/slackMessages';
import { requestSlackMessagesFlow } from './requestSlackMessagesSagas';
import { ipcRenderer } from '../../../modules/util/exposedElectron';

// saga
export const START_WATCH = 'START_WATCH';

// saga
export const startWatch = createAction(START_WATCH);

// selector
export const selectedChannelSelector = (state: RootState) =>
  state.ui.selectChannelUI.selectedChannel;

export const authInfoSelector = (state: RootState) => state.user.authInfo;

export const slackChannelInfoSelector = (state: RootState) =>
  state.api.slackChannelInfo;

export const channelHistoriesSelector = (state: RootState) =>
  state.app.channelHistories;

export const userNameSelector = (state: RootState) =>
  state.api.appUserInfo.displayNameNormalized ||
  state.api.appUserInfo.realNameNormalized;

// Slackのチャンネル情報取得 & Watch開始フロー
export function* requestSlackChannelInfoFlow() {
  const selectedChannel: string = yield select(selectedChannelSelector);
  const { token, botToken }: TokenInfo = yield select(authInfoSelector);
  const currentChannel: SlackChannelInfo = yield select(
    slackChannelInfoSelector
  );
  const userName: string = yield select(userNameSelector);
  try {
    const result: ChannelInfoFromSlack = yield call(
      ipcRenderer.invoke,
      appConst.IPC_SLACK_CHANNEL_INFO,
      {
        token,
        option: {
          channel: selectedChannel,
        },
      }
    );
    yield put(requestSlackChannelInfo());
    yield put(
      requestSlackChannelInfoSuccess({
        id: result?.channel?.id,
        name: result?.channel?.name,
      })
    );
    yield* requestSlackMessagesFlow({ limit: 0 }); // 疎通確認のため0件取得
    yield call(ipcRenderer.invoke, appConst.IPC_SLACK_POST_MESSAGE, {
      botToken,
      option: {
        channel: selectedChannel,
        text: `${userName}さんがこのチャンネルの閲覧を開始しました。`,
      },
    });
    const channelHistories: ChannelHistories = yield select(
      channelHistoriesSelector
    );
    if (channelHistories.length > appConst.CHANNEL_HISTORY_LIMIT) {
      yield put(
        overflowHistory(
          channelHistories.length - appConst.CHANNEL_HISTORY_LIMIT
        )
      );
    }
    yield put(writeChannelHistoriesToStorage(channelHistories));
    yield put(makeWatchWindow());
    if (currentChannel.id !== result?.channel?.id) {
      yield put(watchNewChannel()); // 直前と異なるchannelをwatchする時 or 初回
    }
    const firstMessageTS =
      process.env.DEBUG_MODE || process.env.NODE_ENV === 'test'
        ? ''
        : getUnixTime(new Date()).toString();
    yield put(setLastRequestTime(firstMessageTS));
    yield put(push(routes.WATCH_SCREEN));
  } catch (e: any) {
    // botが対象チャンネルに存在していない時のエラー
    // メジャーユースケースで発生する
    if (e.message.includes(appConst.ERROR_NOT_IN_CHANNEL)) {
      yield put(
        requestMessagesAPIFail({
          error: true,
          error_message: e.message,
        })
      );
      yield put(push(routes.RECOMMEND_BOT));
      return;
    }

    yield put(
      requestSlackChannelInfoFail({
        error: true,
        error_message: e.message,
      })
    );
    removeWebClientInstance(); // 認証に失敗したインスタンスを除去
    yield put(showAlert(e.message));
  }
}

export const startWatchSagas = [
  takeEvery(START_WATCH, requestSlackChannelInfoFlow),
];
