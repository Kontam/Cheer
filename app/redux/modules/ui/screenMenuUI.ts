import { createAction, handleActions } from 'redux-actions';
import { ScreenMenuUI } from '../types';

const INITIAL_STATE: ScreenMenuUI = {
  isOpen: false,
};

// reducer
const OPEN_SCREEN_MENU = 'OPEN_SCREEN_MENU';
const CLOSE_SCREEN_MENU = 'CLOSE_SCREEN_MENU';

// saga
export const openScreenMenu = createAction(OPEN_SCREEN_MENU);
export const closeScreenMenu = createAction(CLOSE_SCREEN_MENU);

export default handleActions(
  {
    [OPEN_SCREEN_MENU]: (state) => ({
      ...state,
      isOpen: true,
    }),
    [CLOSE_SCREEN_MENU]: (state) => ({
      ...state,
      isOpen: false,
    }),
  },
  INITIAL_STATE
);
