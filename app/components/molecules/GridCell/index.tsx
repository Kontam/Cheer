import React from 'react';
import styled from 'styled-components';
import { GridMessage, Member } from '../../../redux/modules/types';
import Message from '../Message';
import removeSlackExpression from '../../../modules/util/removeSlackExpression';
import { Position, PositionX, PositionY } from '../../types';
import { getQAAttributeByPosition } from '../../../modules/testUtil/testAttributes';
import { SlackEmoji } from '../../../modules/util/requests/webClient';

type Props = {
  gridMessage?: GridMessage;
  member?: Member;
  emoji: SlackEmoji;
} & Position;

function convertToFlexParam(param: PositionX | PositionY) {
  switch (param) {
    case 'left':
    case 'top':
      return 'flex-start';
    case 'center':
      return 'center';
    case 'right':
    case 'bottom':
      return 'flex-end';
    default:
      return 'flex-start';
  }
}

const GridCell: React.FC<Props> = ({
  gridMessage,
  positionX = 'left',
  positionY = 'top',
  member,
  emoji,
}) => {
  return (
    <Container positionX={positionX} positionY={positionY}>
      {gridMessage && gridMessage.message && (
        <Message
          fadeIn
          emoji={emoji}
          text={gridMessage.message.text}
          iconUrl={member?.iconUrl}
          name={member?.name}
          color={gridMessage.color}
          exAttributes={getQAAttributeByPosition(positionX, positionY)}
        />
      )}
    </Container>
  );
};

const Container = styled.div<Position>`
  height: 32vh;
  display: flex;
  justify-content: ${({ positionX }) => convertToFlexParam(positionX)};
  align-items: ${({ positionY }) => convertToFlexParam(positionY)};
`;

export default GridCell;
