import { Action, createAction } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import { TokenInfo } from '../types';
import appConst from '../../../modules/constants/appConst';
import { ipcRenderer } from '../../../modules/util/exposedElectron';

export const WRITE_AUTH_TOKEN = 'WRITE_AUTH_TOKEN' as const;

export const writeAuthTokenToStorage =
  createAction<TokenInfo>(WRITE_AUTH_TOKEN);

/**
 * storageにトークンを書き出す
 */
export function* writeAuthTokenToStorageFlow({ payload }: Action<TokenInfo>) {
  yield ipcRenderer.send(appConst.IPC_SAVE_TO_STORE, {
    name: appConst.STORAGE_AUTH_TOKEN,
    value: payload.token,
  });
  yield ipcRenderer.send(appConst.IPC_SAVE_TO_STORE, {
    name: appConst.STORAGE_AUTH_BOT_TOKEN,
    value: payload.botToken,
  });
}

export const authStorageSagas = [
  takeEvery(WRITE_AUTH_TOKEN, writeAuthTokenToStorageFlow),
];
