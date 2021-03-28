import { ipcMain, App } from 'electron';
import appConst from '../../constants/appConst';

export function setAppQuitEventhandler(app: App) {
  ipcMain.on(appConst.IPC_QUIT_APP, () => {
    app.quit();
  });
}
