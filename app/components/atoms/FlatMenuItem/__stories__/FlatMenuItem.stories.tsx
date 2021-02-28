import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import FlatMenuItem from '..';
import { FlatMenu } from '../../../types';

export default {
  title: 'atoms/FlatMenuItem',
  decorators: [withKnobs],
};

const menu: FlatMenu = {
  name: 'test',
  label: 'FlatMenuItem',
  action: action('action'),
}

export const Default = () => (
    <FlatMenuItem
      menu={menu}
    />
);
