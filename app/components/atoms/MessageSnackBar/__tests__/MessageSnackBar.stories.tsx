import React from 'react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import SnackbarComponent from '../index';

// material-uiの問題？ エラーが出るのでstoryshotsに含まない
export default {
  title: 'atoms/MessageSnackbar_DontTest',
  decorators: [withKnobs],
};

export const MessageSnackbar = () => (
  <SnackbarComponent
    text={text('text', 'text')}
    duration={number('duration', 2000)}
    open={boolean('open', true)}
    onClose={action('onClose')}
  />
);
