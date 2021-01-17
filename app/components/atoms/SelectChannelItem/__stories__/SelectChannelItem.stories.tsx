import React from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import SelectChannelItemComponent from '../index';

export default {
  title: 'atoms/SelectChannelItem',
  decorators: [withKnobs],
};

export const SelectChannelItem = () => {
  const slackChannel = {
    id: '1',
    name: text('name', 'channel1'),
  };
  return (
    <BackGround>
      <SelectChannelItemComponent
        slackChannel={slackChannel}
        onClick={action('onClick')}
        selected={boolean('selected', false)}
      />
    </BackGround>
  );
};

const BackGround = styled.div`
  background-color: #f490a7;
  height: 500px;
  width: 100%;
`;
