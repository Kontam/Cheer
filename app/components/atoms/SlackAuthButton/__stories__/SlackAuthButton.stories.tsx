import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import SlackAuthButtonComponent from '../index';
import { SlackAuthInfo } from '../../../types';

export default {
  title: 'atoms/SlackAuthButton',
  decorators: [withKnobs],
};

export const Default = () => {
  const slackAuthInfo: SlackAuthInfo = {
    clientId: 'clientId',
    scope: ['test:scope'],
    botScope: ['test:botscope'],
    redirectUri: 'redirectUri',
    state: 'state',
    team: 'team',
  };

  return (
    <div>
      <SlackAuthButtonComponent
        slackAuthInfo={slackAuthInfo}
        onClick={action('SlackAuthButton')}
      />
    </div>
  );
};
