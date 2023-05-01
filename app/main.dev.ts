/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import 'babel-polyfill';
import appConst from './modules/constants/appConst';
import { createMainWindow } from './modules/windows/mainWindow';
import { setMainUrlSchemeEventHandler } from './modules/eventHandlers/main/urlSchemeEventHandler';
import { setAppQuitEventhandler } from './modules/eventHandlers/main/appQuitEventHandler';
import { setOpenPreferenceEventhandler } from './modules/eventHandlers/main/preferenceEventHandler';
import { setScreenEventHandlers } from './modules/eventHandlers/main/screenEventHandlers';
import { setStoreHandlers } from './modules/eventHandlers/main/storeHandlers';
import { setSlackEventHandlers } from './modules/eventHandlers/main/slackEventHandlers';

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
let mainWindow: BrowserWindow | null;
let mainMenu: Menu | null;

/**
 * メインウィンドウの準備処理
 */
async function readyMainWindow() {
  const windowAndMenu = await createMainWindow();
  mainWindow = windowAndMenu.mainWindow;
  mainMenu = windowAndMenu.mainMenu;
  /*
   * Add event listeners...
   */
  setAppQuitEventhandler(app);
  setMainUrlSchemeEventHandler(mainWindow);
  setOpenPreferenceEventhandler(mainWindow);
  setScreenEventHandlers(mainWindow);
  setStoreHandlers();
  setSlackEventHandlers();
  // 閉じられた時にmainWindowの参照をnullにする Docには残り続けるがwindowがない状態
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', readyMainWindow);

// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on('activate', () => {
  if (mainWindow === null) {
    readyMainWindow();
  }
});

/**
 * preference画面から設定情報を受け取る
 */
ipcMain.on(appConst.IPC_REQUEST_PREFERENCE, async (event, arg) => {
  mainWindow?.webContents.send(appConst.IPC_REQUEST_SETTING, arg);
  event.reply(appConst.IPC_RESPONCE_PREFERENCE, 'recieved');
});

/**
 * rendererから認証完了が通知されたら認証済みステータスに変更
 */
ipcMain.on(appConst.IPC_LOGIN_COMPLETE, (event, arg) => {
  if (!mainMenu) return;
  mainMenu.getMenuItemById(appConst.MAIN_MENU_SELECT_CHANNEL).enabled = true;
});

/**
 * rendererからログアウト完了が通知されたら認証済みステータスに変更
 */
ipcMain.on(appConst.IPC_LOGOUT_COMPLETE, (event, arg) => {
  if (!mainMenu) return;
  mainMenu.getMenuItemById(appConst.MAIN_MENU_SELECT_CHANNEL).enabled = false;
});
