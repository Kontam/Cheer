import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import EmojiComponent from '../index';

export default {
  title: 'atoms/Emoji',
  decorators: [withKnobs],
};

export const Component = () => (
  <EmojiComponent
    emoji={{ test: 'https://placehold.jp/150x150.png' }}
    emojiExpression=":test:"
  />
);
