import { ipcRenderer } from 'electron';
import { Store } from 'redux';
import { createAction } from 'redux-actions';
import appConst from '../../../modules/constants/appConst';
import { SettingsState } from '../types';

export const SUBMIT_SCREEN_SETTING = 'SUBMIT_SCREEN_SETTING' as const;
export const submitScreenSetting = createAction<SettingsState>(
  SUBMIT_SCREEN_SETTING
);

// 設定画面との通信処理など、全設定項目に関係する処理をここに記載する
export function setSettingEventHandler(store: Store) {
  ipcRenderer.on(appConst.IPC_REQUEST_SETTING, (event, arg: SettingsState) => {
    store.dispatch(submitScreenSetting(arg));
  });
}
