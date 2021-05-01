import React from 'react';
import styled from 'styled-components';
import { SlackChannelState } from '../../../redux/modules/types';
import { styleConst } from '../../../modules/styles/styleConst';
import { QA_ATTRIBUTES } from '../../../modules/testUtil/testAttributes';

type Props = {
  slackChannel: SlackChannelState;
  onClick: React.MouseEventHandler;
  selected?: boolean;
};

const SelectChannelItem: React.FC<Props> = ({
  slackChannel,
  onClick,
  selected = false,
}) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      selected={selected}
      {...QA_ATTRIBUTES.CHANNEL_LIST_ITEM}
    >
      {`# ${slackChannel.name}`}
    </Button>
  );
};

const Button = styled.button<{ selected: boolean }>`
  border: none;
  ${({ selected }) =>
    selected
      ? `
    border-bottom: solid 1px ${styleConst.basicGreen};
    background-color: ${styleConst.lightGreen};
  `
      : `border-bottom: solid 1px ${styleConst.lightPink};
    background-color: ${styleConst.basicWhite};
  color: ${styleConst.messageLabel};
  :hover {
    border-bottom: solid 1px ${styleConst.lightPink};
    background-color: ${styleConst.thinPink};
  }
  cursor: pointer;
`}
  outline-offset: -3px;
  height: 60px;
  font-size: 2rem;
  text-align: left;
  width: 100%;
  padding-left: 20px;
  transition: 0.2s;
`;

export default SelectChannelItem;
