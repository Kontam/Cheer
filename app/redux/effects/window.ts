import { createAction } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import {
  makeCurrentWindowTransparent,
  makeCurrentWindowList,
  makeCurrentWindowDefault,
} from '../../modules/windows/utils/makeWindowTransparent';

const MAKE_WATCH_WINDOW = 'MAKE_WATCH_WINDOW';
const MAKE_GENERAL_WINDOW = 'MAKE_GENERAL_WINDOW';
const MAKE_LIST_WINDOW = 'MAKE_LIST_WINDOW';

export const makeWatchWindow = createAction(MAKE_WATCH_WINDOW);
export const makeGeneralWindow = createAction(MAKE_GENERAL_WINDOW);
export const makeListWindow = createAction(MAKE_LIST_WINDOW);

export function* makeWatchWindowFlow() {
  yield makeCurrentWindowTransparent();
}

export function* makeGeneralWindowFlow() {
  yield makeCurrentWindowDefault();
}

export function* makeListWindowFlow() {
  yield makeCurrentWindowList();
}

export const windowSagas = [
  takeEvery(MAKE_WATCH_WINDOW, makeWatchWindowFlow),
  takeEvery(MAKE_GENERAL_WINDOW, makeGeneralWindowFlow),
  takeEvery(MAKE_LIST_WINDOW, makeListWindowFlow),
];
