// import path from 'path';
import { BrowserWindow } from 'electron';

// const installExtensions = async () => {
//   const installer = require('electron-devtools-installer');
//   const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
//   const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

//   return Promise.all(
//     extensions.map(name => installer.default(installer[name], forceDownload))
//   ).catch(console.log);
// };

export const createPreferenceWindow = async (parent: BrowserWindow) => {
  let preferenceWindow: BrowserWindow | null = null;
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    // await installExtensions();
  }

  preferenceWindow = new BrowserWindow({
    show: false,
    width: 700,
    height: 700,
    backgroundColor: '#FFFFFF',
    titleBarStyle: 'hidden',
    webPreferences:
      process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true'
        ? {
            nodeIntegration: true,
          }
        : {
            // TODO preloadしないことによる影響調査
            // preload: path.join(__dirname, 'dist/preference.renderer.prod.js')
            nodeIntegration: true,
          },
  });
  const htmlUrl =
    process.env.NODE_ENV === 'development'
      ? `file://${__dirname}/preference.html`
      : `file://${__dirname}/modules/windows/preference.html`;
  preferenceWindow.loadURL(htmlUrl);
  // preferenceWindow.loadURL(`file://${__dirname}/preference.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  preferenceWindow.webContents.on('did-finish-load', () => {
    if (!preferenceWindow) {
      throw new Error('"preferenceWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      preferenceWindow.minimize();
    } else {
      preferenceWindow.show();
      preferenceWindow.focus();
    }
  });
  return preferenceWindow;
};
