import React, { memo } from 'react';
import styled from 'styled-components';
import appConst from '../../../modules/constants/appConst';
import { SlackAuthInfo } from '../../types';
import { styleConst } from '../../../modules/styles/styleConst';
import { QA_ATTRIBUTES } from '../../../modules/testUtil/testAttributes';

type Props = {
  slackAuthInfo: SlackAuthInfo;
  onClick: (url: string) => void;
};

const SlackAuthButton: React.FC<Props> = ({ slackAuthInfo, onClick }) => {
  const { botScope, scope, clientId, redirectUri, team, state } = slackAuthInfo;
  const scopeString = scope.join(',');
  const botScopeString = botScope.join(',');
  let url = `${appConst.SLACK_AUTH_URL}?client_id=${clientId}&scope=${botScopeString}&user_scope=${scopeString}&redirect_uri=${redirectUri}`;
  if (state) url += `&state=${state}`;
  if (team) url += `&team=${team}`;

  return (
    <Button
      {...QA_ATTRIBUTES.SLACK_AUTH_BUTTON}
      type="button"
      onClick={() => onClick(url)}
    >
      Login
    </Button>
  );
};

const Button = styled.button`
  background-color: ${styleConst.basicGreen};
  border: none;
  color: ${styleConst.darkGreen};
  box-shadow: 0 3px 6px ${styleConst.basicShadow};
  font-weight: 600;
  font-size: 2.8rem;
  height: 60px;
  width: 250px;
  cursor: pointer;
  transition: 0.2s;
  :hover {
    background-color: ${styleConst.lightGreen};
  }
`;

export default memo(SlackAuthButton);
