import { BrowserWindow, ipcMain } from 'electron';
import appConst from '../../constants/appConst';
import { readStore, saveToStore } from '../../util/electronStore';

export function setStoreHandlers(window: BrowserWindow) {
  ipcMain.on(appConst.IPC_SAVE_TO_STORE, (e, arg) => {
    saveToStore(arg.name, arg.value);
  });
  ipcMain.handle(appConst.IPC_REQUEST_READ_STORE, (e, arg) => {
    return readStore(arg.name);
  });
}
