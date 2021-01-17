import { createAction, handleActions, Action } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import { ipcRenderer } from 'electron';
import { AuthInfo, TokenInfo } from '../types';
import appConst from '../../../modules/constants/appConst';
import {
  CHANNEL_LIST_REQUEST_SUCCESS,
  CHANNEL_LIST_REQUEST_FAIL,
  CHANNEL_LIST_REQUEST,
} from '../api/slackChannelList';

export const INITIAL_STATE: AuthInfo = {
  authed: false,
  isInvalid: false,
  token: '',
  botToken: '',
  errorMessage: '',
  loading: false,
};

// reducer
const RECIEVE_TOKEN = 'RECIEVE_TOKEN';
const LOGOUT_WORKSPACE = 'LOGOUT_WORKSPACE';

const IPC_LOGOUT_COMPLETE = 'IPC_LOGOUT_COMPLETE';
const IPC_LOGIN_COMPLETE = 'IPC_LOGIN_COMPLETE';

// reducer
export const recieveToken = createAction<TokenInfo>(RECIEVE_TOKEN);
export const logoutWorkspace = createAction(LOGOUT_WORKSPACE);

export const ipcLogoutComplete = createAction(IPC_LOGOUT_COMPLETE);
export const ipcLoginComplete = createAction(IPC_LOGIN_COMPLETE);

/**
 * ログアウト完了をメインプロセスに通知する
 */
function* ipcLogoutCompleteFlow() {
  yield ipcRenderer.send(appConst.IPC_LOGOUT_COMPLETE);
}

/**
 * ログイン完了をメインプロセスに通知する
 */
function* ipcLoginCompleteFlow() {
  yield ipcRenderer.send(appConst.IPC_LOGIN_COMPLETE);
}

export const authSagas = [
  takeEvery(IPC_LOGOUT_COMPLETE, ipcLogoutCompleteFlow),
  takeEvery(IPC_LOGIN_COMPLETE, ipcLoginCompleteFlow),
];

export default handleActions<AuthInfo, any>(
  {
    [RECIEVE_TOKEN]: (
      state,
      { payload: { token, botToken } }: Action<TokenInfo>
    ) => ({
      ...state,
      token,
      botToken,
    }),

    [CHANNEL_LIST_REQUEST]: (state) => ({
      ...state,
      isInvalid: false,
      authed: false,
      loading: true,
    }),

    [CHANNEL_LIST_REQUEST_SUCCESS]: (state) => ({
      ...state,
      isInvalid: false,
      authed: true,
      loading: false,
    }),

    [CHANNEL_LIST_REQUEST_FAIL]: (state, { payload }: Action<string>) => ({
      ...state,
      isInvalid: true,
      loading: false,
      errorMessage: payload,
    }),

    [LOGOUT_WORKSPACE]: (state) => ({
      ...state,
      token: '',
      isInvalid: false,
      authed: false,
    }),
  },
  INITIAL_STATE
);
