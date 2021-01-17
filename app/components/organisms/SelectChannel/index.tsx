import React, { useCallback, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Presentational from './SelectChannel';
import {
  selectChannel,
  searchChannel,
  selectTab,
} from '../../../redux/modules/ui/selectChannelUI';
import { startWatch } from '../../../redux/modules/sagas/startWatchSagas';
import { SelectChannelTab } from '../../../redux/modules/types';
import { TabInfo } from '../../types';
import { startWatchLoadingSelector } from '../../../redux/modules/api/selectors/startWatchLoading';

const SelectChannel: React.FC = () => {
  const dispatch = useDispatch();
  const channelList = useSelector(
    (state) => state.api.slackChannelList.channels
  );
  const searchedChannelList = useSelector(
    (state) => state.app.searchedChannels
  );
  const selectChannelUI = useSelector((state) => state.ui.selectChannelUI);
  const channelHistories = useSelector((state) => state.app.channelHistories);
  const slackChannelInfo = useSelector((state) => state.api.slackChannelInfo);
  const isLoading = useSelector(startWatchLoadingSelector);

  useEffect(() => {
    dispatch(searchChannel(''));
  }, [dispatch]);

  const handleSelectChannel = useCallback(
    (channelId: string) => dispatch(selectChannel(channelId)),
    [dispatch]
  );
  const handleStartWatch = useCallback(() => dispatch(startWatch()), [
    dispatch,
  ]);
  const handleSearchStringChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      dispatch(searchChannel(e.target.value));
    },
    [dispatch]
  );
  const handleTabItemClick = useCallback(
    (name: SelectChannelTab) => {
      dispatch(selectTab(name));
    },
    [dispatch]
  );
  const tabInfos: TabInfo[] = [
    { name: 'all', label: `all (${searchedChannelList.length})` },
    { name: 'history', label: 'history' },
  ];

  const reversedHistory = useMemo(() => {
    return channelHistories.concat().reverse();
  }, [channelHistories]);

  return (
    <Presentational
      channelList={channelList}
      searchedChannelList={searchedChannelList}
      handleSelectChannel={handleSelectChannel}
      channelHistories={reversedHistory}
      selectChannelUI={selectChannelUI}
      handleStartWatch={handleStartWatch}
      handleSearchStringChange={handleSearchStringChange}
      handleTabItemClick={handleTabItemClick}
      tabInfos={tabInfos}
      slackChannelInfo={slackChannelInfo}
      isLoading={isLoading}
    />
  );
};

export default SelectChannel;
