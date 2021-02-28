import { ipcRenderer } from 'electron';
import { createAction } from 'redux-actions';
import { call, takeEvery } from 'redux-saga/effects';
import appConst from '../../modules/constants/appConst';

const QUIT_APP = 'QUIT_APP';

export const quitApp = createAction(QUIT_APP);

export function* quitAppFlow() {
  yield call(ipcRenderer.send, appConst.IPC_QUIT_APP);
}

export const appSagas = [takeEvery(QUIT_APP, quitAppFlow)];
