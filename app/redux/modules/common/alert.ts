import { createAction, handleActions, Action } from 'redux-actions';
import { Alert } from '../types';

export const INITIAL_STATE: Alert = {
  message: '',
  showing: false,
};

const SHOW_ALERT = 'SHOW_ALERT';
const HIDE_ALERT = 'HIDE_ALERT';

export const showAlert = createAction<string>(SHOW_ALERT);
export const hideAlert = createAction(HIDE_ALERT);

export default handleActions<Alert, any>(
  {
    [SHOW_ALERT]: (_, { payload }: Action<string>) => ({
      showing: true,
      message: payload,
    }),
    [HIDE_ALERT]: (state) => ({
      showing: false,
      message: state.message,
    }),
  },
  INITIAL_STATE
);
