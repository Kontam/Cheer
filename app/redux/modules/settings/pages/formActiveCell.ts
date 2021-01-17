// 設定画面のUI表示に利用するstate
// redux-formの管理外のなので別stateで管理する
import { createAction, handleActions, Action } from 'redux-actions';
import { FormActiveCell } from '../../types';

export const INITIAL_STATE: FormActiveCell = [];

const ADD_FORM_ACTIVECELL = 'ADD_FORM_ACTIVECELL';
const REMOVE_FORM_ACTIVECELL = 'REMOVE_FORM_ACTIVECELL';
const INITIALIZE_FORM_ACTIVECELL = 'INITIALIZE_FORM_ACTIVECELL';

export const initializeFormActiveCell = createAction<FormActiveCell>(
  INITIALIZE_FORM_ACTIVECELL
);
export const addFormActiveCell = createAction<number>(ADD_FORM_ACTIVECELL);
export const removeFormActiveCell = createAction<number>(
  REMOVE_FORM_ACTIVECELL
);

export default handleActions<FormActiveCell, any>(
  {
    [INITIALIZE_FORM_ACTIVECELL]: (
      state,
      { payload }: Action<FormActiveCell>
    ) => [...payload],
    [ADD_FORM_ACTIVECELL]: (state, { payload }: Action<number>) => [
      ...state,
      payload,
    ],
    [REMOVE_FORM_ACTIVECELL]: (state, { payload }: Action<number>) =>
      state.filter((num) => num !== payload),
  },
  INITIAL_STATE
);
