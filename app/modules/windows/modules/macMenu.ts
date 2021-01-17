import { app, MenuItemConstructorOptions, Menu, BrowserWindow } from 'electron';
import appConst from '../../constants/appConst';
import { createPreferenceWindow } from '../preferenceWindow';

export interface DarwinMenuItemConstructorOptions
  extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export const createMacMenu = (
  mainWindow: BrowserWindow
): DarwinMenuItemConstructorOptions[] => {
  let preferenceWindow: BrowserWindow | null;
  const menuAbout = {
    label: 'Cheer',
    submenu: [
      {
        id: appConst.MAIN_MENU_PREFERENCE,
        label: 'preference',
        accelerator: 'Command+P',
        click: async () => {
          if (preferenceWindow) return;
          preferenceWindow = await createPreferenceWindow(mainWindow);
          preferenceWindow.on('closed', () => {
            preferenceWindow = null;
          });
        },
      },
      {
        id: appConst.MAIN_MENU_SELECT_CHANNEL,
        label: 'select channel',
        accelerator: 'Command+C',
        enabled: false,
        click: async () => {
          mainWindow.webContents.send(appConst.IPC_SELECT_CHANNEL);
        },
      },
      {
        id: appConst.MAIN_MENU_LOGOUT,
        label: 'logout',
        accelerator: 'Command+X',
        click: async () => {
          mainWindow.webContents.send(appConst.IPC_LOGOUT, []);
        },
      },
      {
        id: appConst.MAIN_MENU_QUIT,
        label: 'Quit',
        accelerator: 'Command+Q',
        click: () => {
          app.quit();
        },
      },
    ],
  };

  const subMenuEdit: DarwinMenuItemConstructorOptions = {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
      {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:',
      },
    ],
  };

  const subMenuViewDev: MenuItemConstructorOptions = {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'Command+R',
        click: () => {
          mainWindow.webContents.reload();
        },
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click: () => {
          mainWindow.webContents.toggleDevTools();
        },
      },
    ],
  };

  const menus = [menuAbout, subMenuEdit];

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    menus.push(subMenuViewDev);
  }

  return menus;
};
