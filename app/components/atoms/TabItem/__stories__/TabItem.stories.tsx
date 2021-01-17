import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import TabItemComponent from '../index';

export default {
  title: 'atoms/TabItem',
  decorators: [withKnobs],
};

export const TabItem = () => (
  <div>
    <TabItemComponent
      label={text('label', 'tab label')}
      selected={boolean('selected', false)}
      onClick={action('onItemClick')}
    />
  </div>
);
