// APIから取得したSlackMessageの情報
// 内容の変更はこのステートでは行わない
import { createAction, handleActions, Action } from 'redux-actions';
import { MessageFromSlack } from '../../../modules/util/requests/webClient';
import { SlackMessages, SlackMessage } from '../types';

export const INITIAL_STATE: SlackMessages = {
  messages: [],
  loading: false,
  loaded: false,
  error: false,
  error_message: '',
};

export const REQUEST_MESSAGES_API = 'REQUEST_MESSAGES_API';
export const REQUEST_MESSAGES_API_FAIL = 'REQUEST_MESSAGES_API_FAIL';
export const REQUEST_MESSAGES_API_SUCCESS = 'REQUEST_MESSAGES_API_SUCCESS';

export const requestMessagesAPI = createAction(REQUEST_MESSAGES_API);
export const requestMessagesAPISuccess = createAction<MessageFromSlack[]>(
  REQUEST_MESSAGES_API_SUCCESS
);
export const requestMessagesAPIFail = createAction(REQUEST_MESSAGES_API_FAIL);

export default handleActions<SlackMessages, any>(
  {
    [REQUEST_MESSAGES_API]: (state) => ({
      ...state,
      loaded: false,
      loading: true,
      error: false,
      error_message: '',
    }),
    [REQUEST_MESSAGES_API_SUCCESS]: (
      _,
      { payload }: Action<SlackMessage[]>
    ) => ({
      messages: [...payload],
      loaded: true,
      loading: false,
      error: false,
      error_message: '',
    }),
    [REQUEST_MESSAGES_API_FAIL]: (
      state,
      { payload }: Action<SlackMessage[]>
    ) => ({
      ...state,
      ...payload,
      messages: [],
      loaded: false,
      loading: false,
    }),
  },
  INITIAL_STATE
);
