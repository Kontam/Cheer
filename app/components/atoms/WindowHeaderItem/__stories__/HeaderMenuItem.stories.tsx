import React from 'react';
import { action } from '@storybook/addon-actions';
import WindowHeaderItem from '..';
import { HeaderMenu } from '../../../types';

export default {
  title: 'atoms/WindowHeaderItem',
};

const menu: HeaderMenu = {
  name: 'test',
  iconNode: <h1>a</h1>,
  action: action('action'),
};

export const Default = () => {
  return <WindowHeaderItem menu={menu} />;
};
