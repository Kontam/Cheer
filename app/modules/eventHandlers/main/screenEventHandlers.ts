import { BrowserWindow, ipcMain } from 'electron';
import appConst from '../../constants/appConst';
import {
  makeWindowClickable,
  makeWindowDefault,
  makeWindowList,
  makeWindowTransparent,
  makeWindowUnClickable,
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
  ipcMain.on(appConst.IPC_UN_CLICKABLE_SCREEN, () => {
    makeWindowUnClickable(mainWindow);
  });
  ipcMain.on(appConst.IPC_CLICKABLE_SCREEN, () => {
    makeWindowClickable(mainWindow);
  });
}
