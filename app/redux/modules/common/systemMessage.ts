import { createAction, handleActions, Action } from 'redux-actions';
import { SystemMessage } from '../types';

export const INITIAL_STATE: SystemMessage = {
  message: '',
  showing: false,
};

const SHOW_SYSTEM_MESSAGE = 'SHOW_SYSTEM_MESSAGE';
const HIDE_SYSTEM_MESSAGE = 'HIDE_SYSTEM_MESSAGE';

export const showSystemMessage = createAction<string>(SHOW_SYSTEM_MESSAGE);
export const hideSystemMessage = createAction(HIDE_SYSTEM_MESSAGE);

export default handleActions<SystemMessage, any>(
  {
    [SHOW_SYSTEM_MESSAGE]: (_, { payload }: Action<string>) => ({
      showing: true,
      message: payload,
    }),
    [HIDE_SYSTEM_MESSAGE]: (state) => ({
      showing: false,
      message: state.message,
    }),
  },
  INITIAL_STATE
);
