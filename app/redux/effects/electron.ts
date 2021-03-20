import { ipcRenderer } from 'electron';
import { call, takeEvery } from 'redux-saga/effects';
import { QUIT_APP, OPEN_PREFERENCE } from './app';
import appConst from '../../modules/constants/appConst';
import {
  makeCurrentWindowTransparent,
  makeCurrentWindowList,
  makeCurrentWindowDefault,
} from '../../modules/windows/utils/makeWindowTransparent';
import {
  MAKE_WATCH_WINDOW,
  MAKE_GENERAL_WINDOW,
  MAKE_LIST_WINDOW,
} from './window';

// electronに依存するsagaはこのファイルに集約する
// storybookなどのsagaを使わない環境でcomponentがelectronに依存しないようにする

export function* quitAppFlow() {
  yield call(ipcRenderer.send, appConst.IPC_QUIT_APP);
}

export function* openPreferenceFlow() {
  yield call(ipcRenderer.send, appConst.IPC_OPEN_PREFERENCE);
}

export function* makeWatchWindowFlow() {
  yield makeCurrentWindowTransparent();
}

export function* makeGeneralWindowFlow() {
  yield makeCurrentWindowDefault();
}

export function* makeListWindowFlow() {
  yield makeCurrentWindowList();
}

export const electronSagas = [
  takeEvery(QUIT_APP, quitAppFlow),
  takeEvery(OPEN_PREFERENCE, openPreferenceFlow),
  takeEvery(MAKE_WATCH_WINDOW, makeWatchWindowFlow),
  takeEvery(MAKE_GENERAL_WINDOW, makeGeneralWindowFlow),
  takeEvery(MAKE_LIST_WINDOW, makeListWindowFlow),
];
