import { createAction, handleActions, Action } from 'redux-actions';
import { SearchedChannels, SlackChannelState } from '../types';

const INITIAL_STATE: SearchedChannels = [];

const SEARCH_CHANNEL_SUCCESS = 'SEARCH_CHANNEL_SUCCESS';

export const searchChannelSuccess = createAction<SlackChannelState[]>(
  SEARCH_CHANNEL_SUCCESS
);

export default handleActions(
  {
    [SEARCH_CHANNEL_SUCCESS]: (
      state,
      { payload }: Action<SlackChannelState[]>
    ) => [...payload],
  },
  INITIAL_STATE
);
