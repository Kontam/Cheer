import { app, BrowserWindow } from 'electron';
import appConst from '../../constants/appConst';
import { isUrlScheme } from '../../util/isUrlScheme';

export const setMainUrlSchemeEventHandler = (
  mainWindow: BrowserWindow | null
) => {
  /**
   * URLスキームでの起動(mac)
   */
  app.on('open-url', (e, url) => {
    mainWindow?.webContents.send(appConst.IPC_RECIEVE_TOKEN, url);
  });

  /**
   * URLスキームでの起動(windows)
   * macと違い２重起動するので対策する
   */
  const gotTheLock = app.requestSingleInstanceLock();
  if (!gotTheLock) {
    app.quit();
  } else {
    // 2つめのウィンドウが開かれた時
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      commandLine.forEach((cmd) => {
        if (isUrlScheme(cmd)) {
          mainWindow?.webContents.send(appConst.IPC_RECIEVE_TOKEN, cmd);
        }
      });

      if (mainWindow) {
        if (mainWindow.isMinimized()) {
          // 最小化してたら復帰させる
          mainWindow.restore();
        }
        mainWindow.focus(); // フォーカス
      }
    });
  }
};
