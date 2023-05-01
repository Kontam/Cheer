import { push } from 'connected-react-router';
import { Action, createAction } from 'redux-actions';
import { take, put, call, takeEvery } from 'redux-saga/effects';
import appConst from '../../../modules/constants/appConst';
import { routes } from '../../../modules/constants/routes';
import { ipcRenderer } from '../../../modules/util/exposedElectron';
import {
  removeWebClientInstance,
  SlackChannel,
  SlackChannelListResponse,
  UserProfileGetResponse,
} from '../../../modules/util/requests/webClient';
import { makeGeneralWindow, makeListWindow } from '../../effects/window';
import {
  requestAppUserInfo,
  requestAppUserInfoSuccess,
} from '../api/appUserInfo';
import {
  channelListRequest,
  channelListRequestFail,
  channelListRequestSuccess,
} from '../api/slackChannelList';
import { requestEmojiListFlow } from '../api/slackEmojiList';

import { TokenInfo } from '../types';
import {
  ipcLoginComplete,
  ipcLogoutComplete,
  logoutWorkspace,
  recieveToken,
} from '../user/authInfo';
import { writeAuthTokenToStorage } from './authStorageSagas';

// saga
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const LOGIN_WITH_STORAGE = 'LOGIN_WITH_STORAGE' as const;

// saga
export const login = createAction<TokenInfo>(LOGIN);
export const logout = createAction(LOGOUT);
export const loginWithStorage = createAction(LOGIN_WITH_STORAGE);

/**
 * 認証トークンをstorageから読み出してログインする
 */
export function* loginWithStorageFlow() {
  const token: string = yield call(
    ipcRenderer.invoke,
    appConst.IPC_REQUEST_READ_STORE,
    { name: appConst.STORAGE_AUTH_TOKEN }
  );
  const botToken: string = yield call(
    ipcRenderer.invoke,
    appConst.IPC_REQUEST_READ_STORE,
    { name: appConst.STORAGE_AUTH_BOT_TOKEN }
  );
  if (!token || !botToken) return;
  yield put(login({ token, botToken }));
}

// ログイン & ログアウトフロー
export function* loginSaga() {
  while (true) {
    // login
    const { payload }: Action<TokenInfo> = yield take(LOGIN);
    yield put(recieveToken(payload));
    try {
      yield call(requestChannelListFlow, payload.token);
      yield call(requestEmojiListFlow, payload.token);
      yield put(requestAppUserInfo());
      const user: UserProfileGetResponse = yield call(
        ipcRenderer.invoke,
        appConst.IPC_SLACK_USER_PROFILE,
        { token: payload.token }
      );
      yield put(requestAppUserInfoSuccess(user));
      yield put(writeAuthTokenToStorage(payload));
      yield put(makeListWindow());
      yield put(push(routes.HOME));
      yield put(ipcLoginComplete());

      // logout
      yield take(LOGOUT);
      yield put(logoutWorkspace());
      yield put(writeAuthTokenToStorage({ token: '', botToken: '' })); // tokenの削除
      yield put(makeGeneralWindow());
      yield put(push(routes.LOGIN));
      yield put(ipcLogoutComplete());
    } catch (e) {
      yield put(channelListRequestFail((e as any)?.data?.error));
      yield call(removeWebClientInstance);
      yield put(writeAuthTokenToStorage({ token: '', botToken: '' })); // tokenの削除
    }
  }
}

function* requestChannelListFlow(token: string) {
  yield put(channelListRequest());
  const list = yield* requestChannelListAll(token);
  yield put(channelListRequestSuccess(list));
}

function* requestChannelListAll(token: string) {
  let nextCursor: string | 'initial' = 'initial';
  let list: SlackChannel[] = [];
  while (nextCursor) {
    const result: SlackChannelListResponse = yield call(
      ipcRenderer.invoke,
      appConst.IPC_SLACK_CHANNEL_LIST,
      {
        token,
        option: {
          limit: 1000,
          cursor: nextCursor === 'initial' ? '' : nextCursor,
        },
      }
    );
    list = list.concat(result.channels);
    nextCursor = result.response_metadata.next_cursor;
  }
  return list;
}

export const loginSagas = [
  loginSaga(),
  takeEvery(LOGIN_WITH_STORAGE, loginWithStorageFlow),
];
