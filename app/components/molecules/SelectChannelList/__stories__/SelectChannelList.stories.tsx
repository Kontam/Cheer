import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import SelectChannelListComponent from '../index';
import { SlackChannelState } from '../../../../redux/modules/types';

export default {
  title: 'molecules/SelectChannelList',
  decorators: [withKnobs],
};

export const SelectChannelList = () => {
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
  return (
    <BackGround>
      <SelectChannelListComponent
        searchedChannelList={slackChannels}
        handleSelectChannel={action('onClick')}
        selectedChannel="1"
      />
    </BackGround>
  );
};

const BackGround = styled.div`
  background-color: #f490a7;
  height: 500px;
  width: 100%;
`;
