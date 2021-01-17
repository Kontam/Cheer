// APIから取得したSlackMessageの情報
// 内容の変更はこのステートでは行わない
import { createAction, handleActions, Action } from 'redux-actions';
import { UserProfileGetResponse } from '../../../modules/util/requests/webClient';
import { AppUserInfo } from '../types';

export const INITIAL_STATE: AppUserInfo = {
  avatorHash: '',
  realName: '',
  realNameNormalized: '',
  displayName: '',
  displayNameNormalized: '',
  error: false,
  error_message: '',
  loading: false,
  loaded: false,
};

// reducer
export const REQUEST_APP_USER_INFO = 'REQUEST_APP_USER_INFO';
export const REQUEST_APP_USER_INFO_SUCCESS = 'REQUEST_APP_USER_INFO_SUCCESS';
export const REQUEST_APP_USER_INFO_FAIL = 'REQUEST_APP_USER_INFO_FAIL';

// reducer
export const requestAppUserInfo = createAction(REQUEST_APP_USER_INFO);
export const requestAppUserInfoSuccess = createAction<
  Partial<UserProfileGetResponse>
>(REQUEST_APP_USER_INFO_SUCCESS);
export const requestAppUserInfoFail = createAction<Partial<AppUserInfo>>(
  REQUEST_APP_USER_INFO_FAIL
);

export default handleActions<AppUserInfo, any>(
  {
    [REQUEST_APP_USER_INFO]: (state) => ({
      ...state,
      loading: true,
      loaded: false,
    }),
    [REQUEST_APP_USER_INFO_SUCCESS]: (
      _,
      { payload: { profile } }: Action<UserProfileGetResponse>
    ) => ({
      avatorHash: profile.avatar_hash,
      realName: profile.real_name,
      realNameNormalized: profile.real_name_normalized,
      displayName: profile.display_name,
      displayNameNormalized: profile.display_name_normalized,
      error: false,
      error_message: '',
      loaded: true,
      loading: false,
    }),
    [REQUEST_APP_USER_INFO_FAIL]: (
      state,
      { payload }: Action<AppUserInfo>
    ) => ({
      ...state,
      payload,
      loading: false,
      loaded: true,
    }),
  },
  INITIAL_STATE
);
