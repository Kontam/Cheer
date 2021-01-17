import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import WindowHeaderComponent from '../index';

export default {
  title: 'organisms/WindowHeader',
  decorators: [withKnobs],
};

export const WindowHeader = () => (
  <div>
    <WindowHeaderComponent />
  </div>
);
