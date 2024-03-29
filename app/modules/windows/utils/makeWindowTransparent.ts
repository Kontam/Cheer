import { BrowserWindow } from 'electron';
import appConst from '../../constants/appConst';

/**
 * current windowを最前面透明スクリーンにする
 */
export function makeWindowTransparent(window: BrowserWindow) {
  window.resizable = true;
  window.maximize();
  window.setBackgroundColor('#00CCCCCC');
  window.setIgnoreMouseEvents(true, { forward: true });
  window.setAlwaysOnTop(true);
  window.setVisibleOnAllWorkspaces(true, {
    visibleOnFullScreen: true,
    skipTransformProcessType: true, // 指定しないとDock上でアプリが非表示になる
  });
  window.setHasShadow(false);
}

/**
 * 最前面透明スクリーンにした変更を元に戻す
 */
export function makeWindowDefault(window: BrowserWindow) {
  window.unmaximize();
  window.setIgnoreMouseEvents(false);
  window.setAlwaysOnTop(false);
  window.setVisibleOnAllWorkspaces(false);
  window.setHasShadow(true);
  window.resizable = true; // windowsではresizable falseではsetSizeが効かない
  window.setSize(appConst.DEFAULT_WINDOW_X, appConst.DEFAULT_WINDOW_Y);
  window.resizable = false;
}

/**
 * ChannelSelect画面の画面情報に変更する
 */
export function makeWindowList(window: BrowserWindow) {
  makeWindowDefault(window);
  window.setSize(800, 600);
}

/**
 * Window自体をun_clickableにする
 * Watch中のメニューボタンからマウスリーヴしたときに透明スクリーンをクリックできないようにする
 */
export function makeWindowUnClickable(window: BrowserWindow) {
  window.setIgnoreMouseEvents(true, { forward: true });
}

/**
 * Window自体をclickableにする
 * Watch中のメニューボタンからマウスホバーしたときクリックできるようにする
 */
export function makeWindowClickable(window: BrowserWindow) {
  window.setIgnoreMouseEvents(false);
}
