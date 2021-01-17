import React, { useState } from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import SelectChannelComponent from '../SelectChannel';
import {
  SlackChannelState,
  SelectChannelUI,
  SelectChannelTab,
  SlackChannelInfo,
} from '../../../../redux/modules/types';
import { TabInfo } from '../../../types';

export default {
  title: 'organisms/SelectChannel',
  decorators: [withKnobs],
};

const StoryWithHooks = () => {
  const slackChannels: SlackChannelState[] = [
    {
      id: '1',
      name: text('name', 'channel1'),
    },
    {
      id: '2',
      name: text('name2', 'channel2'),
    },
  ];
  const channelHistories: SlackChannelState[] = [
    {
      id: '1',
      name: text('name', 'channel1'),
    },
    {
      id: '3',
      name: text('name3', 'history channel3'),
    },
  ];
  const [str, setStr] = useState('');
  const [channel, setChannel] = useState('');
  const [tab, setTab] = useState('all');
  const selectChannelUI: SelectChannelUI = {
    selectedChannel: channel,
    searchString: str,
    selectedTab: tab as SelectChannelTab,
  };
  const tabInfos: TabInfo[] = [
    { name: 'all', label: `all` },
    { name: 'history', label: 'history' },
  ];
  const slackChannelInfo: SlackChannelInfo = {
    id: '1',
    name: 'name1',
    error: boolean('error', false),
    error_message: text('errorMessage', 'errorMessage'),
    loading: false,
    loaded: true,
  };
  return (
    <BackGround>
      <SelectChannelComponent
        channelList={[...slackChannels, ...channelHistories]}
        channelHistories={channelHistories}
        searchedChannelList={slackChannels}
        handleSelectChannel={(channelId) => setChannel(channelId)}
        selectChannelUI={selectChannelUI}
        handleStartWatch={action('handleStartWatch')}
        handleSearchStringChange={(e) => setStr(e.target.value)}
        handleTabItemClick={(name: string) => setTab(name)}
        tabInfos={tabInfos}
        slackChannelInfo={slackChannelInfo}
        isLoading={boolean('isLoading', true)}
      />
    </BackGround>
  );
};

export const SelectChannel = () => <StoryWithHooks />;

const BackGround = styled.div`
  background-color: #f490a7;
  height: 500px;
  width: 100%;
`;
