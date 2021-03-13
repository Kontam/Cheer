import React from 'react';
import { actions } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import ScreenMenuComponent from '../ScreenMenu';
import { FlatMenu } from '../../../types';

export default {
  title: 'organisms/ScreenMenu',
  decorators: [withKnobs],
};

const menus: FlatMenu[] = [
  {
    name: 'quit',
    label: 'quit',
    action: () => actions('quit'),
  },
];

export const ScreenMenu = () => (
  <ScreenMenuComponent menus={menus} isOpen={boolean('isOpen', true)} />
);
