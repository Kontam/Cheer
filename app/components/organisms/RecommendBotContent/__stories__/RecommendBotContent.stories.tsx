import React from 'react';
import styled from 'styled-components';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import RecommendBotContentComponent from '../RecommendBotContent';

export default {
  title: 'organisms/RecommendBotContent',
  decorators: [withKnobs],
};

export const Default = () => {
  return (
    <Window>
      <RecommendBotContentComponent
        handleBack={action('handleBack')}
        handleRetry={action('handleRetry')}
        channelName="channelName"
        onClickHelp={action('onClickHelp')}
        isLoading
      />
    </Window>
  );
};

const Window = styled.div`
  width: 800px;
  height: 600px;
`;
