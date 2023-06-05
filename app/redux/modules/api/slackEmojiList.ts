import { createAction, handleActions, Action } from 'redux-actions';
import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { WebClient } from '@slack/web-api';
import { resourceLimits } from 'worker_threads';
import { SlackChannelList, SlackEmojiList } from '../types';
import {
  SlackEmoji,
  SlackEmojiListResponse,
} from '../../../modules/util/requests/webClient';
import { routes } from '../../../modules/constants/routes';
import { makeListWindow } from '../../effects/window';
import appConst from '../../../modules/constants/appConst';

export const INITIAL_STATE: SlackEmojiList = {
  emoji: {},
  error: false,
  error_message: '',
  loading: false,
  loaded: false,
};

// reducer
export const EMOJI_LIST_REQUEST = 'EMOJI_LIST_REQUEST';
export const EMOJI_LIST_REQUEST_SUCCESS = 'EMOJI_LIST_REQUEST_SUCCESS';
export const EMOJI_LIST_REQUEST_FAIL = 'EMOJI_LIST_REQUEST_FAIL';

// saga
export const PUSH_SELECT_EMOJI = 'PUSH_SELECT_EMOJI';

// reducer
export const emojiListRequest = createAction(EMOJI_LIST_REQUEST);
export const emojiListRequestSuccess = createAction<SlackEmoji>(
  EMOJI_LIST_REQUEST_SUCCESS
);
export const emojiListRequestFail = createAction<string>(
  EMOJI_LIST_REQUEST_FAIL
);

// saga
export const pushSelectChannel = createAction(PUSH_SELECT_EMOJI);

// select channelを起動した時の処理フロー
export function* pushSelectChannelFlow() {
  yield put(push(routes.HOME));
  yield put(makeListWindow());
}

export const emojiListSagas = [
  takeEvery(PUSH_SELECT_EMOJI, pushSelectChannelFlow),
];

export function* requestEmojiListFlow(token: string) {
  yield put(emojiListRequest());
  const list = yield* requestEmojiList(token);
  yield put(emojiListRequestSuccess(list));
}

function* requestEmojiList(token: string) {
  const result: SlackEmojiListResponse = yield call(
    window.electron.ipcRenderer.invoke,
    appConst.IPC_SLACK_EMOJI_LIST,
    { token }
  );
  return result.emoji;
}

export default handleActions<SlackEmojiList, any>(
  {
    [EMOJI_LIST_REQUEST]: (state) => {
      return {
        ...state,
        error: false,
        loading: true,
        loaded: false,
      };
    },
    [EMOJI_LIST_REQUEST_SUCCESS]: (state, { payload }: Action<SlackEmoji>) => {
      return {
        ...state,
        error: false,
        loading: false,
        loaded: true,
        emoji: payload,
      };
    },
  },
  INITIAL_STATE
);
