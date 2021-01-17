import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import UserIconComponent from '../index';
import iconForStory from '../../../../static/image/iconForStory.png';

export default {
  title: 'atoms/UserIcon',
  decorators: [withKnobs],
};

export const UserIcon = () => (
  <div>
    <UserIconComponent src={text('src', iconForStory)} />
  </div>
);
