import { createSelector } from 'reselect';
import { RootState } from '../../types';

const messagesLoadingSelector = (state: RootState) =>
  state.api.slackMessages.loading;
const channelInfoLoadingSelector = (state: RootState) =>
  state.api.slackChannelInfo.loading;

export const startWatchLoadingSelector = createSelector(
  [messagesLoadingSelector, channelInfoLoadingSelector],
  (messageLoading, channelLoading) => messageLoading || channelLoading
);
