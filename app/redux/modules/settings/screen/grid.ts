import { createAction, handleActions, Action } from 'redux-actions';
import { Grid, SettingsState } from '../../types';
import { SUBMIT_SCREEN_SETTING } from '../setting';

export const INITIAL_STATE: Grid = {
  activeCell: [0, 2, 6, 8],
  overflow: false,
  queueLimit: 10,
};

const SET_GRID = 'SET_GRID';

export const setGrid = createAction<Grid>(SET_GRID);

export default handleActions<Grid, any>(
  {
    [SET_GRID]: (state, { payload }: Action<Grid>) => ({
      ...state,
      ...payload,
    }),
    [SUBMIT_SCREEN_SETTING]: (state, { payload }: Action<SettingsState>) => ({
      ...state,
      ...payload.screen.grid,
    }),
  },
  INITIAL_STATE
);
