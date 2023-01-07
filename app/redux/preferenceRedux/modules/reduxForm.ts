import { put, takeEvery } from 'redux-saga/effects';
import { autofill } from 'redux-form';
import { createAction, Action } from 'redux-actions';
import appConst from '../../../modules/constants/appConst';
import { SettingsState } from '../../modules/types';

export const AUTOFILL_PREFERENCE = 'AUTOFILL_PREFERENCE' as const;
export const autofillPreference =
  createAction<SettingsState>(AUTOFILL_PREFERENCE);

// 設定内容stateを受け取り、formの値を埋める
function* autofillPreferenceFlow({ payload }: Action<SettingsState>) {
  // Screen Modeをフォームに挿入
  yield put(
    autofill(
      appConst.FORM_SCREEN_SETTING,
      appConst.FIELD_SCREEN_SETTING_MODE,
      payload.mode.screen || ''
    )
  );
  // Conveyor_Amountをフォームに挿入
  yield put(
    autofill(
      appConst.FORM_SCREEN_SETTING,
      appConst.FIELD_SCREEN_SETTING_CONVEYOR_AMOUNT,
      payload.screen.horizonConveyor.amount || ''
    )
  );
  // Conveyor_Overflowをフォームに挿入
  yield put(
    autofill(
      appConst.FORM_SCREEN_SETTING,
      appConst.FIELD_SCREEN_SETTING_CONVEYOR_OVERFLOW,
      payload.screen.horizonConveyor.overflow
    )
  );
  // Conveyor_Limitをフォームに挿入
  yield put(
    autofill(
      appConst.FORM_SCREEN_SETTING,
      appConst.FIELD_SCREEN_SETTING_CONVEYOR_LIMIT,
      payload.screen.horizonConveyor.queueLimit || ''
    )
  );

  // Grid_Overflowをフォームに挿入
  yield put(
    autofill(
      appConst.FORM_SCREEN_SETTING,
      appConst.FIELD_SCREEN_SETTING_GRID_OVERFLOW,
      payload.screen.grid.overflow
    )
  );
  // Grid_Limitをフォームに挿入
  yield put(
    autofill(
      appConst.FORM_SCREEN_SETTING,
      appConst.FIELD_SCREEN_SETTING_GRID_LIMIT,
      payload.screen.grid.queueLimit || ''
    )
  );
}

export const preferenceReduxFormSagas = [
  takeEvery(AUTOFILL_PREFERENCE, autofillPreferenceFlow),
];
