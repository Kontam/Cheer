// APIから取得したSlackMessageの情報
// 内容の変更はこのステートでは行わない
import { createAction, handleActions, Action } from 'redux-actions';
import { SlackChannelInfo } from '../types';

export type SlackChannelInfoStorage = {
  id: string;
  name: string;
};

export const INITIAL_STATE: SlackChannelInfo = {
  id: '',
  name: '',
  error: false,
  error_message: '',
  loading: false,
  loaded: false,
};

// reducer
export const REQUEST_SLACK_CHANNEL_INFO = 'REQUEST_SLACK_CHANNEL_INFO';
export const REQUEST_SLACK_CHANNEL_INFO_SUCCESS =
  'REQUEST_SLACK_CHANNEL_INFO_SUCCESS';
export const REQUEST_SLACK_CHANNEL_INFO_FAIL =
  'REQUEST_SLACK_CHANNEL_INFO_FAIL';

// reducer
export const requestSlackChannelInfo = createAction(REQUEST_SLACK_CHANNEL_INFO);
export const requestSlackChannelInfoSuccess = createAction<
  Partial<SlackChannelInfo>
>(REQUEST_SLACK_CHANNEL_INFO_SUCCESS);
export const requestSlackChannelInfoFail = createAction<
  Partial<SlackChannelInfo>
>(REQUEST_SLACK_CHANNEL_INFO_FAIL);

export default handleActions<SlackChannelInfo, any>(
  {
    [REQUEST_SLACK_CHANNEL_INFO]: (state) => ({
      ...state,
      loading: true,
      loaded: false,
      error: false,
      error_message: '',
    }),
    [REQUEST_SLACK_CHANNEL_INFO_SUCCESS]: (
      _,
      { payload }: Action<SlackChannelInfo>
    ) => ({
      ...payload,
      error: false,
      error_message: '',
      loading: false,
      loaded: true,
    }),
    [REQUEST_SLACK_CHANNEL_INFO_FAIL]: (
      state,
      { payload }: Action<SlackChannelInfo>
    ) => ({
      ...state,
      ...payload,
      loading: false,
      loaded: true,
    }),
  },
  INITIAL_STATE
);
