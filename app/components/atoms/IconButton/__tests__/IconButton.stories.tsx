import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import IconButtonComponent from '../index';
import keyIcon from '../../../../static/image/keyIcon.svg';

export default {
  title: 'atoms/IconButton',
  decorators: [withKnobs],
};

export const IconButton = () => (
  <div>
    <IconButtonComponent src={keyIcon} onClick={action('IconButtonClicked')} />
  </div>
);
