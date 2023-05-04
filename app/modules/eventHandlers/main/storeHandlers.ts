import { ipcMain } from 'electron';
import appConst from '../../constants/appConst';
import { readStore, saveToStore } from '../../util/electronStore';

export function setStoreHandlers() {
  ipcMain.on(appConst.IPC_SAVE_TO_STORE, (e, arg) => {
    saveToStore(arg[0].name, arg[0].value);
  });
  ipcMain.handle(appConst.IPC_REQUEST_READ_STORE, (e, arg) => {
    return readStore(arg.name);
  });
}
