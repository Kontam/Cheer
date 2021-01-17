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
    />
  </div>
);
