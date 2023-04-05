import { createAction, Action } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import appConst from '../../modules/constants/appConst';
import { submitScreenSetting } from '../modules/settings/setting';
import { SettingsState } from '../modules/types';
import { initializeFormActiveCell } from '../modules/settings/pages/formActiveCell';
import { ipcRenderer } from '../../modules/util/exposedElectron';

export const READ_SETTING_CONFIG = 'READ_SETTING_CONFIG' as const;
export const WRITE_SETTING_CONFIG = 'WRITE_SETTING_CONFIG' as const;

export const readSettingConfig = createAction(READ_SETTING_CONFIG);
export const writeSettingConfig = createAction(WRITE_SETTING_CONFIG);

export function* readSettingConfigFlow() {
  const settingConfig: SettingsState = yield call(
    ipcRenderer.invoke,
    appConst.IPC_REQUEST_READ_STORE,
    { name: appConst.CONFIG_SETTING }
  );
  if (!settingConfig) return;
  yield put(submitScreenSetting(settingConfig));
  yield put(initializeFormActiveCell(settingConfig.screen.grid.activeCell));
}

export function* writeSettingConfigFlow({ payload }: Action<SettingsState>) {
  yield ipcRenderer.send(appConst.IPC_SAVE_TO_STORE, {
    name: appConst.CONFIG_SETTING,
    value: payload,
  });
  yield put(submitScreenSetting(payload));
}

export const configSagas = [
  takeEvery(READ_SETTING_CONFIG, readSettingConfigFlow),
  takeEvery(WRITE_SETTING_CONFIG, writeSettingConfigFlow),
];
