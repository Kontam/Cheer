import { createAction, handleActions, Action } from 'redux-actions';
import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { SlackChannelList } from '../types';
import { SlackChannel } from '../../../modules/util/requests/webClient';
import { routes } from '../../../modules/constants/routes';
import { makeListWindow } from '../../effects/window';

export const INITIAL_STATE: SlackChannelList = {
  channels: [],
  error: false,
  error_message: '',
  loading: false,
  loaded: false,
};

// reducer
export const CHANNEL_LIST_REQUEST = 'CHANNEL_LIST_REQUEST';
export const CHANNEL_LIST_REQUEST_SUCCESS = 'CHANNEL_LIST_REQUEST_SUCCESS';
export const CHANNEL_LIST_REQUEST_FAIL = 'CHANNEL_LIST_REQUEST_FAIL';

// saga
export const PUSH_SELECT_CHANNEL = 'PUSH_SELECT_CHANNEL';

// reducer
export const channelListRequest = createAction(CHANNEL_LIST_REQUEST);
export const channelListRequestSuccess = createAction<SlackChannel[]>(
  CHANNEL_LIST_REQUEST_SUCCESS
);
export const channelListRequestFail = createAction<string>(
  CHANNEL_LIST_REQUEST_FAIL
);

// saga
export const pushSelectChannel = createAction(PUSH_SELECT_CHANNEL);

// select channelを起動した時の処理フロー
export function* pushSelectChannelFlow() {
  yield put(push(routes.HOME));
  yield put(makeListWindow());
}

export const channelListSagas = [
  takeEvery(PUSH_SELECT_CHANNEL, pushSelectChannelFlow),
];

export default handleActions<SlackChannelList, any>(
  {
    [CHANNEL_LIST_REQUEST_SUCCESS]: (
      state,
      { payload }: Action<SlackChannel[]>
    ) => {
      return {
        ...state,
        error: false,
        loading: false,
        loaded: true,
        channels: payload.map((channel) => ({
          id: channel.id,
          name: channel.name,
        })),
      };
    },
  },
  INITIAL_STATE
);
