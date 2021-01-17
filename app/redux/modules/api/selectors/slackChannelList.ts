import { createSelector } from 'reselect';
import { RootState } from '../../types';

const selectedChannelSelector = (state: RootState) =>
  state.ui.selectChannelUI.selectedChannel;
const channelListSelector = (state: RootState) =>
  state.api.slackChannelList.channels;

/**
 * 選択中チャンネルIDに合致するチャンネル情報をリストから取得する
 */
export const selectedChannelInfoSelector = createSelector(
  selectedChannelSelector,
  channelListSelector,
  (channelId, channelList) => {
    return channelList.find((channel) => channel.id === channelId) || null;
  }
);
