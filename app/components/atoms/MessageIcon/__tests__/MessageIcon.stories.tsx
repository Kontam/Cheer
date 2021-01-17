import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import MessageIconComponent from '../index';
import iconForStory from '../../../../static/image/iconForStory.png';

export default {
  title: 'atoms/MessageIcon',
  decorators: [withKnobs],
};

export const MessageIcon = () => (
  <div>
    <MessageIconComponent
      src={text('src', iconForStory)}
      bgColor={text('bgColor', '#66b7ec')}
    />
  </div>
);
