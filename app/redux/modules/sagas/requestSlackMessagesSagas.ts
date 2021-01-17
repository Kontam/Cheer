import { createAction } from 'redux-actions';
import { select, put, call, takeEvery } from 'redux-saga/effects';
import filterSlackMessages from '../../../modules/util/filterSlackMessage';
import {
  getWebClientBotInstance,
  SlackHistoryResponse,
} from '../../../modules/util/requests/webClient';
import {
  requestMessagesAPI,
  requestMessagesAPISuccess,
} from '../api/slackMessages';
import { enqueueMessageQueue } from '../app/messageQueue';
import { AuthInfo, RootState } from '../types';
import { overflowMessageQueue } from '../util/overflowMessageQueue';
import { addUserListFlow, authInfoSelector } from './utils/addUserListFlow';

export const lastRequestTimeSelector = (state: RootState) =>
  state.app.requestInfo.lastRequestTime;
export const selectedChannelSelector = (state: RootState) =>
  state.ui.selectChannelUI.selectedChannel;
export const REQUEST_SLACK_MESSAGES = 'REQUEST_SLACK_MESSAGES';
export const requestSlackMessages = createAction(REQUEST_SLACK_MESSAGES);

// Slack APIにメッセージとユーザー情報をリクエストする
export function* requestSlackMessagesFlow(): any {
  const selectedChannel: string = yield select(selectedChannelSelector);
  const authInfo: AuthInfo = yield select(authInfoSelector);
  const botWeb = getWebClientBotInstance(authInfo.botToken);

  const oldest = yield select(lastRequestTimeSelector);
  yield put(requestMessagesAPI());
  const result: SlackHistoryResponse = yield call(
    botWeb.conversations.history,
    {
      channel: selectedChannel,
      oldest,
    }
  );
  const userMessages = filterSlackMessages(result.messages);
  yield* addUserListFlow(userMessages);

  yield put(requestMessagesAPISuccess(userMessages));
  yield put(enqueueMessageQueue(userMessages.reverse()));
  yield* overflowMessageQueue();
}

export const requestSlackMessagesSagas = [
  takeEvery(REQUEST_SLACK_MESSAGES, requestSlackMessagesFlow),
];
