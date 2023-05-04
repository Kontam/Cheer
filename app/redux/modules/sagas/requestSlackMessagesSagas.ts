import { ConversationsHistoryArguments } from '@slack/web-api';
import { Action, createAction } from 'redux-actions';
import { select, put, call, takeEvery } from 'redux-saga/effects';
import appConst from '../../../modules/constants/appConst';
import { ipcRenderer } from '../../../modules/util/exposedElectron';
import filterSlackMessages from '../../../modules/util/filterSlackMessage';
import { SlackHistoryResponse } from '../../../modules/util/requests/webClient';
import {
  requestMessagesAPI,
  requestMessagesAPISuccess,
} from '../api/slackMessages';
import { enqueueMessageQueue } from '../app/messageQueue';
import { AuthInfo, RootState, SlackMessages } from '../types';
import { overflowMessageQueue } from '../util/overflowMessageQueue';
import { addUserListFlow, authInfoSelector } from './utils/addUserListFlow';

export const slackMessagesSelector = (state: RootState) =>
  state.api.slackMessages;
export const lastRequestTimeSelector = (state: RootState) =>
  state.app.requestInfo.lastRequestTime;
export const selectedChannelSelector = (state: RootState) =>
  state.ui.selectChannelUI.selectedChannel;

export const REQUEST_SLACK_MESSAGES = 'REQUEST_SLACK_MESSAGES';
export const requestSlackMessages =
  createAction<Partial<ConversationsHistoryArguments> | void>(
    REQUEST_SLACK_MESSAGES
  );

// Slack APIにメッセージとユーザー情報をリクエストするフロー
export function* requestSlackMessagesFlow(
  options: Partial<ConversationsHistoryArguments>
): any {
  const slackMessages: SlackMessages = yield select(slackMessagesSelector);
  if (slackMessages.loading) return;

  const selectedChannel: string = yield select(selectedChannelSelector);
  const authInfo: AuthInfo = yield select(authInfoSelector);

  const oldest = yield select(lastRequestTimeSelector);
  yield put(requestMessagesAPI());
  const result: SlackHistoryResponse = yield call(
    ipcRenderer.invoke,
    appConst.IPC_SLACK_CONVERSATIONS_HISTORY,
    {
      botToken: authInfo.botToken,
      option: {
        channel: selectedChannel,
        oldest,
        ...{ ...options, ...(options.limit === 0 ? { limit: 1 } : {}) },
      },
    }
  );
  // 疎通確認用にoptionsにlimit:0が指定されるケースがある
  // SlackAPIは0に対応していないので1としてリクエストし、レスポンスをメッセージキューに入れないことで0を表現する
  const userMessages = filterSlackMessages(result.messages);
  yield* addUserListFlow(userMessages);
  yield put(requestMessagesAPISuccess(userMessages));
  if (options.limit === 0) return;

  yield put(enqueueMessageQueue(userMessages.reverse()));
  yield* overflowMessageQueue();
}

export function* requestSlackMessagesWrapper({
  payload = {},
}: Action<Partial<ConversationsHistoryArguments>>): any {
  yield* requestSlackMessagesFlow(payload);
}

export const requestSlackMessagesSagas = [
  takeEvery(REQUEST_SLACK_MESSAGES, requestSlackMessagesWrapper),
];
