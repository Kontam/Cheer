import { Action, createAction } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import { TokenInfo } from '../types';
import { saveToStore } from '../../../modules/util/electronStore';
import appConst from '../../../modules/constants/appConst';

export const WRITE_AUTH_TOKEN = 'WRITE_AUTH_TOKEN' as const;

export const writeAuthTokenToStorage = createAction<TokenInfo>(
  WRITE_AUTH_TOKEN
);

/**
 * storageにトークンを書き出す
 */
export function* writeAuthTokenToStorageFlow({ payload }: Action<TokenInfo>) {
  yield saveToStore(appConst.STORAGE_AUTH_TOKEN, payload.token);
  yield saveToStore(appConst.STORAGE_AUTH_BOT_TOKEN, payload.botToken);
}

export const authStorageSagas = [
  takeEvery(WRITE_AUTH_TOKEN, writeAuthTokenToStorageFlow),
];
