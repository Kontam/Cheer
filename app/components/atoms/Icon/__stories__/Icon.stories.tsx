import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import IconComponent from '../index';
import keyIcon from '../../../../static/image/keyIcon.svg';

export default {
  title: 'atoms/Icon',
  decorators: [withKnobs],
};

export const Icon = () => <IconComponent src={keyIcon} />;
