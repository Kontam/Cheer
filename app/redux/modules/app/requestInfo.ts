// リクエストに関する客観的なデータ
// リクエスト間隔など、ユーザーが変更するような値はここではなくsettingで持つ

import { createAction, handleActions } from 'redux-actions';
import { REQUEST_MESSAGES_API_SUCCESS } from '../api/slackMessages';
import { RequestInfo } from '../types';

export const INITIAL_STATE: RequestInfo = {
  lastRequestTime: '0',
};

const SET_REQUEST_INFO = 'SET_REQUEST_INFO ';
const SET_LAST_REQUESTTIME = 'SET_LAST_REQUESTTIME';

export const setRequestInfo = createAction<RequestInfo>(SET_REQUEST_INFO);
export const setLastRequestTime = createAction<string>(SET_LAST_REQUESTTIME);

export default handleActions<RequestInfo, any>(
  {
    [SET_REQUEST_INFO]: (_, { payload }) => ({ ...payload }),
    [SET_LAST_REQUESTTIME]: (state, { payload }) => ({
      ...state,
      lastRequestTime: payload,
    }),
    [REQUEST_MESSAGES_API_SUCCESS]: (state, { payload }) => {
      if (payload.length < 1) return state;
      return {
        lastRequestTime: payload[0].ts || state,
      };
    },
  },
  INITIAL_STATE
);
