import { ipcMain, BrowserWindow } from 'electron';
import appConst from '../../constants/appConst';
import { createPreferenceWindow } from '../../windows/preferenceWindow';

export function setOpenPreferenceEventhandler(window: BrowserWindow) {
  ipcMain.on(appConst.IPC_OPEN_PREFERENCE, () => {
    createPreferenceWindow(window);
  });
}
