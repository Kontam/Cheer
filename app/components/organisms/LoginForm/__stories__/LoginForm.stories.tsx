import React from 'react';
import styled from 'styled-components';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import LoginFormComponent from '../LoginForm';
import { SlackAuthInfo } from '../../../types';
import { AuthInfo } from '../../../../redux/modules/types';

export default {
  title: 'organisms/LoginForm',
  decorators: [withKnobs],
};

export const Default = () => {
  const slackAuthInfo: SlackAuthInfo = {
    clientId: 'clientId',
    scope: ['test:scope'],
    botScope: ['test:botScope'],
    redirectUri: 'redirectUri',
    state: 'state',
    team: 'team',
  };
  const authInfo: AuthInfo = {
    authed: false,
    isInvalid: false,
    botToken: '',
    token: '',
    errorMessage: '',
    loading: boolean('loading', true),
  };

  return (
    <Window>
      <LoginFormComponent
        slackAuthInfo={slackAuthInfo}
        handleStartAuth={action('LoginForm')}
        authInfo={authInfo}
      />
    </Window>
  );
};

const Window = styled.div`
  width: 500px;
  height: 500px;
`;
