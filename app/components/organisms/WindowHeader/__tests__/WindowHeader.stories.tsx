import React from 'react';
import { actions } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import WindowHeaderComponent from '../WindowHeader';
import { HeaderMenu } from '../../../types';

export default {
  title: 'organisms/WindowHeader',
  decorators: [withKnobs],
};

const menus: HeaderMenu[] = [
  {
    name: 'quit',
    iconNode: <h1>a</h1>,
    action: () => actions('actions'),
  },
];

export const WindowHeader = () => (
  <div>
    <WindowHeaderComponent menus={menus} />
  </div>
);
