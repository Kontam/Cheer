import { ipcRenderer } from 'electron';
import { call, takeEvery } from 'redux-saga/effects';
import { QUIT_APP, OPEN_PREFERENCE } from './app';
import appConst from '../../modules/constants/appConst';

export function* quitAppFlow() {
  yield call(ipcRenderer.send, appConst.IPC_QUIT_APP);
}

export function* openPreferenceFlow() {
  yield call(ipcRenderer.send, appConst.IPC_OPEN_PREFERENCE);
}

export const electronSagas = [
  takeEvery(QUIT_APP, quitAppFlow),
  takeEvery(OPEN_PREFERENCE, openPreferenceFlow),
];
