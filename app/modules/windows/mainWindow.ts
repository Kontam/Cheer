import { BrowserWindow } from 'electron';
import path from 'path';
import MenuBuilder from './menu';

const installExtensions = async () => {
  // eslint-disable-next-line global-require
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload))
  );
};

export const createMainWindow = async () => {
  let mainWindow: BrowserWindow | null = null;
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }
  mainWindow = new BrowserWindow({
    show: false,
    width: 500,
    height: 500,
    transparent: true,
    frame: false, // windowsではtransparentはframelessのみサポート
    resizable: false,
    backgroundColor: '#FEFFFFFF',
    webPreferences:
      process.env.NODE_ENV === 'development'
        ? {
            preload: path.join(__dirname, '../..', 'dist', 'preload.js'),
          }
        : {
            preload: path.join(__dirname, 'dist', 'preload.js'),
          },
  });
  const htmlUrl =
    process.env.NODE_ENV === 'development'
      ? `file://${__dirname}/app.html`
      : `file://${__dirname}/modules/windows/app.html`;
  mainWindow.loadURL(htmlUrl);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  const mainMenu = menuBuilder.buildMenu();
  return { mainWindow, mainMenu };
  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();
};
