import { remote } from 'electron';
import appConst from '../../constants/appConst';

/**
 * current windowを最前面透明スクリーンにする
 */
export function makeCurrentWindowTransparent() {
  const window = remote.getCurrentWindow();
  window.resizable = true;
  window.maximize();
  window.setBackgroundColor('#00CCCCCC');
  window.setIgnoreMouseEvents(true);
  window.setAlwaysOnTop(true);
  window.setHasShadow(false);
}

/**
 * 最前面透明スクリーンにした変更を元に戻す
 */
export function makeCurrentWindowDefault() {
  const window = remote.getCurrentWindow();
  window.resizable = true;
  window.unmaximize();
  window.setIgnoreMouseEvents(false);
  window.setAlwaysOnTop(false);
  window.setHasShadow(true);
  window.setSize(appConst.DEFAULT_WINDOW_X, appConst.DEFAULT_WINDOW_Y);
  return window;
}

/**
 * ChannelSelect画面の画面情報に変更する
 */
export function makeCurrentWindowList() {
  const window = makeCurrentWindowDefault();
  window.setSize(800, 600);
}
