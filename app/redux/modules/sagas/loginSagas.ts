import { WebClient } from '@slack/web-api';
import { push } from 'connected-react-router';
import { Action, createAction } from 'redux-actions';
import { take, put, call, takeEvery } from 'redux-saga/effects';
import appConst from '../../../modules/constants/appConst';
import { routes } from '../../../modules/constants/routes';
import { readStore } from '../../../modules/util/electronStore';
import {
  getWebClientInstance,
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
  const token: string = yield readStore(appConst.STORAGE_AUTH_TOKEN);
  const botToken: string = yield readStore(appConst.STORAGE_AUTH_BOT_TOKEN);
  if (!token || !botToken) return;
  yield put(login({ token, botToken }));
}

// ログイン & ログアウトフロー
export function* loginSaga() {
  while (true) {
    // login
    const { payload }: Action<TokenInfo> = yield take(LOGIN);
    yield put(recieveToken(payload));
    const web = getWebClientInstance(payload.token);
    try {
      yield call(requestChannelListFlow, web);
      yield put(requestAppUserInfo());
      const user: UserProfileGetResponse = yield call(web.users.profile.get);
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
      yield put(channelListRequestFail(e?.data?.error));
      yield call(removeWebClientInstance);
      yield put(writeAuthTokenToStorage({ token: '', botToken: '' })); // tokenの削除
    }
  }
}

function* requestChannelListFlow(webClient: WebClient) {
  yield put(channelListRequest());
  const list = yield* requestChannelListAll(webClient);
  yield put(channelListRequestSuccess(list));
}

function* requestChannelListAll(webClient: WebClient) {
  let nextCursor: string | 'initial' = 'initial';
  let list: SlackChannel[] = [];
  while (nextCursor) {
    const result: SlackChannelListResponse = yield call(
      webClient.conversations.list,
      {
        limit: 1000,
        cursor: nextCursor === 'initial' ? '' : nextCursor,
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
