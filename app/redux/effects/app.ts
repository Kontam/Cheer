import { ipcRenderer } from 'electron';
import { createAction } from 'redux-actions';
import { call, takeEvery } from 'redux-saga/effects';
import appConst from '../../modules/constants/appConst';

const QUIT_APP = 'QUIT_APP';
const OPEN_PREFERENCE = 'OPEN_PREFERENCE';

export const quitApp = createAction(QUIT_APP);
export const openPreference = createAction(OPEN_PREFERENCE);

export function* quitAppFlow() {
  yield call(ipcRenderer.send, appConst.IPC_QUIT_APP);
}

export function* openPreferenceFlow() {
  yield call(ipcRenderer.send, appConst.IPC_OPEN_PREFERENCE);
}

export const appSagas = [
  takeEvery(QUIT_APP, quitAppFlow),
  takeEvery(OPEN_PREFERENCE, openPreferenceFlow),
];
