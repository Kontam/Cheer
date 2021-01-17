import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import TabBarComponent from '../index';
import { TabInfo } from '../../../types';

export default {
  title: 'molecules/TabBar',
  decorators: [withKnobs],
};

const tabInfos: TabInfo[] = [
  { name: 'all', label: `all` },
  { name: 'history', label: 'history' },
];

export const TabBar = () => (
  <div>
    <TabBarComponent
      tabInfos={tabInfos}
      selectedTab={tabInfos[0].name}
      onItemClick={action('onItemClick')}
    />
  </div>
);
