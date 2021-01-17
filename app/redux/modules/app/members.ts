import { createAction, handleActions, Action } from 'redux-actions';
import { Members } from '../types';

export const INITIAL_STATE: Members = [];

export const ADD_MEMBERS = 'ADD_MEMBERS';
export const REMOVE_MEMBERS = 'REMOVE_MEMBERS';

export const addMembers = createAction<Members>(ADD_MEMBERS);
export const removeMembers = createAction<string[]>(REMOVE_MEMBERS);

export default handleActions<Members, any>(
  {
    [ADD_MEMBERS]: (state, { payload }: Action<Members>) => [
      ...state,
      ...payload,
    ],
    [REMOVE_MEMBERS]: (state, { payload }: Action<string[]>) =>
      state.filter((member) => !payload.some((id) => id === member.id)),
  },
  INITIAL_STATE
);
