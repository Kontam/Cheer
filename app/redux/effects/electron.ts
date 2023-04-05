import { call, takeEvery } from 'redux-saga/effects';
import { QUIT_APP, OPEN_PREFERENCE, CLOSE_WINDOW } from './app';
import appConst from '../../modules/constants/appConst';
import {
  MAKE_WATCH_WINDOW,
  MAKE_GENERAL_WINDOW,
  MAKE_LIST_WINDOW,
} from './window';
import { ipcRenderer } from '../../modules/util/exposedElectron';

// electronに依存するsagaはこのファイルに集約する
// storybookなどのsagaを使わない環境でcomponentがelectronに依存しないようにする

export function* quitAppFlow() {
  yield call(ipcRenderer.send, appConst.IPC_QUIT_APP);
}

export function* openPreferenceFlow() {
  yield call(ipcRenderer.send, appConst.IPC_OPEN_PREFERENCE);
}

export function* makeWatchWindowFlow() {
  yield call(ipcRenderer.send, appConst.IPC_WATCH_SCREEN);
}

export function* makeGeneralWindowFlow() {
  yield call(ipcRenderer.send, appConst.IPC_DEFAULT_SCREEN);
}

export function* makeListWindowFlow() {
  yield call(ipcRenderer.send, appConst.IPC_LIST_SCREEN);
}

export function* closeWindowFlow() {
  yield console.log('effects/electron.ts: closeWindowSaga is disabled now');
  /*
  const window = remote.getCurrentWindow();
  yield window.close();
  */
}

export const electronSagas = [
  takeEvery(QUIT_APP, quitAppFlow),
  takeEvery(OPEN_PREFERENCE, openPreferenceFlow),
  takeEvery(MAKE_WATCH_WINDOW, makeWatchWindowFlow),
  takeEvery(MAKE_GENERAL_WINDOW, makeGeneralWindowFlow),
  takeEvery(MAKE_LIST_WINDOW, makeListWindowFlow),
  takeEvery(CLOSE_WINDOW, closeWindowFlow),
];
