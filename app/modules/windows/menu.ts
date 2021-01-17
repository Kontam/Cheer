import { app, Menu, BrowserWindow } from 'electron';
import { createPreferenceWindow } from './preferenceWindow';
import { createWindowsMenu } from './modules/windowsMenu';
import {
  DarwinMenuItemConstructorOptions,
  createMacMenu,
} from './modules/macMenu';

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  preferenceWindow: BrowserWindow | null;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
    this.preferenceWindow = null;
  }

  buildMenu() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    const dockMenu = Menu.buildFromTemplate(this.buildDockTemplate());
    if (app.dock) {
      // windowsにはdockが無い
      app.dock.setMenu(dockMenu);
    }

    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDockTemplate() {
    const preference: DarwinMenuItemConstructorOptions = {
      label: 'preference',
      click: async () => {
        if (this.preferenceWindow) return;
        this.preferenceWindow = await createPreferenceWindow(this.mainWindow);
        this.preferenceWindow.on('closed', () => {
          this.preferenceWindow = null;
        });
      },
    };
    return [preference];
  }

  buildDarwinTemplate() {
    const menus = createMacMenu(this.mainWindow);
    return menus;
  }

  buildDefaultTemplate() {
    const defaultTemplate = createWindowsMenu(this.mainWindow);
    return defaultTemplate;
  }
}
