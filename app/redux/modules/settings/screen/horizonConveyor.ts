import { createAction, handleActions, Action } from 'redux-actions';
import { HorizonConveyor, SettingsState } from '../../types';
import { SUBMIT_SCREEN_SETTING } from '../setting';

export const INITIAL_STATE: HorizonConveyor = {
  amount: 3,
  overflow: false,
  queueLimit: 10,
};

const SET_CONVEYOR = 'SET_CONVEYOR';

export const setHorizonConveyor = createAction<HorizonConveyor>(SET_CONVEYOR);

export default handleActions<HorizonConveyor, any>(
  {
    [SET_CONVEYOR]: (state, { payload }: Action<HorizonConveyor>) => ({
      ...state,
      ...payload,
    }),
    [SUBMIT_SCREEN_SETTING]: (state, { payload }: Action<SettingsState>) => ({
      ...state,
      ...payload.screen.horizonConveyor,
    }),
  },
  INITIAL_STATE
);
