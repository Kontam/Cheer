import { BrowserWindow } from 'electron';
import { createPreferenceWindow } from '../preferenceWindow';
import appConst from '../../constants/appConst';

export const createWindowsMenu = (mainWindow: BrowserWindow) => {
  return [
    {
      label: '&View',
      submenu:
        process.env.NODE_ENV === 'development' ||
        process.env.DEBUG_PROD === 'true'
          ? [
              {
                label: '&Reload',
                accelerator: 'Ctrl+R',
                click: () => {
                  mainWindow.webContents.reload();
                },
              },
              {
                label: 'Toggle &Full Screen',
                accelerator: 'F11',
                click: () => {
                  mainWindow.setFullScreen(!mainWindow.isFullScreen());
                },
              },
              {
                label: 'Toggle &Developer Tools',
                accelerator: 'Alt+Ctrl+I',
                click: () => {
                  mainWindow.webContents.toggleDevTools();
                },
              },
            ]
          : [
              {
                label: 'Toggle &Full Screen',
                accelerator: 'F11',
                click: () => {
                  mainWindow.setFullScreen(!mainWindow.isFullScreen());
                },
              },
              {
                label: 'Toggle &Developer Tools',
                accelerator: 'Alt+Ctrl+I',
                click: () => {
                  mainWindow.webContents.toggleDevTools();
                },
              },
              {
                label: 'preference',
                accelerator: 'Ctrl+P',
                click: async () => {
                  // Todo windowの参照の持ち方を考える
                  await createPreferenceWindow(mainWindow);
                },
              },
            ],
    },
    {
      label: 'Cheer',
      submenu: [
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
      ],
    },
  ];
};
