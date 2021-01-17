import { createAction, handleActions, Action } from 'redux-actions';
import { ChannelHistories, SlackChannelInfo } from '../types';
import { REQUEST_SLACK_CHANNEL_INFO_SUCCESS } from '../api/slackChannelInfo';

export const INITIAL_STATE: ChannelHistories = [];

// reducer
export const HISTORY_LOADED = 'HISTORY_LOADED';
export const OVERFLOW_HISTORY = 'OVERFLOW_HISTORY';

// saga
export const READ_CHANNEL_HISTORIES_FROM_STORAGE =
  'READ_CHANNEL_HISTORIES_FROM_STORAGE';
export const WRITE_CHANNEL_HISTORIES_TO_STORAGE =
  'WRITE_CHANNEL_HISTORIES_TO_STORAGE';

// reducer
export const historyLoaded = createAction<ChannelHistories>(HISTORY_LOADED);
export const overflowHistory = createAction<number>(OVERFLOW_HISTORY);

// saga
export const readChannelHistoriesFromStorage = createAction(
  READ_CHANNEL_HISTORIES_FROM_STORAGE
);
export const writeChannelHistoriesToStorage = createAction(
  WRITE_CHANNEL_HISTORIES_TO_STORAGE
);

export default handleActions<ChannelHistories, any>(
  {
    [HISTORY_LOADED]: (_, { payload }: Action<ChannelHistories>) => [
      ...payload,
    ],

    [REQUEST_SLACK_CHANNEL_INFO_SUCCESS]: (
      state,
      { payload }: Action<SlackChannelInfo>
    ) => {
      const withoutSameId = state.reduce((acc: ChannelHistories, current) => {
        if (current.id === payload.id) return acc;
        return [...acc, current];
      }, []);
      return [...withoutSameId, payload];
    },

    [OVERFLOW_HISTORY]: (state, { payload }: Action<number>) =>
      state.slice(payload),
  },
  INITIAL_STATE
);
