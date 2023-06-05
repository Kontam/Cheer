import { Middleware } from 'redux';
import { Action, createAction } from 'redux-actions';
import appConst from '../../modules/constants/appConst';
import { ipcRenderer } from '../../modules/util/exposedElectron';

export const OPEN_DEFAULT_BROWSER = 'OPEN_DEFAULT_BROWSER';

export const openDefaultBrowser = createAction<string>(OPEN_DEFAULT_BROWSER);

/*
 * フォルダ操作、ブラウザ開閉などネイティブ固有の操作をハンドルする
 * */
export const desktopIntegrationMiddleware: Middleware =
  (store) => (next) => (action: Action<string>) => {
    if (action.type !== OPEN_DEFAULT_BROWSER) {
      return next(action);
    }

    ipcRenderer.send(appConst.IPC_OPEN_BROWSER, action.payload);
    return next(action);
  };
