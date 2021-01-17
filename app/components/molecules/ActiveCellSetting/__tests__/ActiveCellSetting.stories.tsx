import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ActiveCellSetting from '../index';

export default {
  title: 'molecules/ActiveCellSetting',
  decorators: [withKnobs],
};

const activeCell = [1, 2, 3, 4];

export const Default = () => (
  <div>
    <ActiveCellSetting
      activeCell={activeCell}
      onFormActiveCellClick={action('onFormActiveCellClick')}
      onFormInactiveCellClick={action('onFormInactiveCellClick')}
    />
  </div>
);
