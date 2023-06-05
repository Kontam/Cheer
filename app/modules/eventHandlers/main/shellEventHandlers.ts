import { ipcMain, shell } from 'electron';
import appConst from '../../constants/appConst';

export function setShellEventHandlers() {
  ipcMain.on(appConst.IPC_OPEN_BROWSER, (e, arg) => {
    shell.openExternal(arg[0]);
  });
}
