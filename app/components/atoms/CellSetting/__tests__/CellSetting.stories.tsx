import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import CellSettingComponent, { SettingCell } from '../index';

export default {
  title: 'atoms/CellSetting',
  decorators: [withKnobs],
};

const activeCell: SettingCell = {
  cellNum: 1,
  isActive: true,
};

const inactiveCell: SettingCell = {
  cellNum: 1,
  isActive: false,
};

export const Active = () => (
  <div>
    <CellSettingComponent
      settingCell={activeCell}
      onActiveCellClick={action('onActiveCellClick')}
      onInactiveCellClick={action('onInactiveCellClick')}
    />
  </div>
);

export const Inactive = () => (
  <div>
    <CellSettingComponent
      settingCell={inactiveCell}
      onActiveCellClick={action('onActiveCellClick')}
      onInactiveCellClick={action('onInactiveCellClick')}
    />
  </div>
);
