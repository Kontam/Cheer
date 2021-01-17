import { Middleware } from 'redux';
import { shell } from 'electron';
import { createAction } from 'redux-actions';

export const OPEN_DEFAULT_BROWSER = 'OPEN_DEFAULT_BROWSER';

export const openDefaultBrowser = createAction<string>(OPEN_DEFAULT_BROWSER);

/*
 * フォルダ操作、ブラウザ開閉などネイティブ固有の操作をハンドルする
 * */
export const desktopIntegrationMiddleware: Middleware = (store) => (next) => (
  action
) => {
  if (action.type !== OPEN_DEFAULT_BROWSER) {
    return next(action);
  }

  shell.openExternal(action.payload);
  return next(action);
};
