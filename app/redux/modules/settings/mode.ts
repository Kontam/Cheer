import { createAction, handleActions, Action } from 'redux-actions';
import appConst from '../../../modules/constants/appConst';
import { Mode, SettingsState } from '../types';
import { SUBMIT_SCREEN_SETTING } from './setting';

export const INITIAL_STATE: Mode = {
  // screen: appConst.SCREEN_MODE_GRID
  screen: appConst.SCREEN_MODE_CONVEYOR,
};

const SET_MODE = 'SET_MODE';

export const setMode = createAction<Mode>(SET_MODE);

export default handleActions<Mode, any>(
  {
    [SET_MODE]: (state, { payload }: Action<Mode>) => ({
      ...payload,
    }),
    [SUBMIT_SCREEN_SETTING]: (state, { payload }: Action<SettingsState>) => ({
      ...payload.mode,
    }),
  },
  INITIAL_STATE
);
