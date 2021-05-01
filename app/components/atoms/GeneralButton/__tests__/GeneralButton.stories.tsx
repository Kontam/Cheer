import React from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import GeneralButtonComponent from '../index';

export default {
  title: 'atoms/GeneralButton',
  decorators: [withKnobs],
};

export const Active = () => (
  <div>
    <GeneralButtonComponent
      label={text('label', 'label')}
      type="submit"
      disabled={boolean('disabled', false)}
      exAttributes={{ 'data-qa': 'test' }}
    />
  </div>
);

export const Passive = () => (
  <div>
    <GeneralButtonComponent
      label={text('label', 'label')}
      type="submit"
      disabled={boolean('disabled', false)}
      buttonType="passive"
      exAttributes={{ 'data-qa': 'test' }}
    />
  </div>
);

export const Full = () => (
  <div>
    <GeneralButtonComponent
      label={text('label', 'label')}
      type="submit"
      disabled={boolean('disabled', false)}
      full
      exAttributes={{ 'data-qa': 'test' }}
    />
  </div>
);
