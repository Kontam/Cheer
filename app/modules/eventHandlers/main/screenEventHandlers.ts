import { BrowserWindow, ipcMain } from 'electron';
import appConst from '../../constants/appConst';
import {
  makeWindowDefault,
  makeWindowList,
  makeWindowTransparent,
} from '../../windows/utils/makeWindowTransparent';

export function setScreenEventHandlers(mainWindow: BrowserWindow) {
  ipcMain.on(appConst.IPC_WATCH_SCREEN, () => {
    makeWindowTransparent(mainWindow);
  });
  ipcMain.on(appConst.IPC_DEFAULT_SCREEN, () => {
    makeWindowDefault(mainWindow);
  });
  ipcMain.on(appConst.IPC_LIST_SCREEN, () => {
    makeWindowList(mainWindow);
  });
}
