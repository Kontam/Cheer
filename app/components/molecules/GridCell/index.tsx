import React from 'react';
import styled from 'styled-components';
import { GridMessage, Member } from '../../../redux/modules/types';
import Message from '../Message';
import removeSlackExpression from '../../../modules/util/removeSlackExpression';

export type PositionX = 'left' | 'right' | 'center';
export type PositionY = 'top' | 'bottom' | 'center';
export type Position = { positionX: PositionX; positionY: PositionY };

type Props = {
  gridMessage?: GridMessage;
  member?: Member;
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
}) => {
  return (
    <Container positionX={positionX} positionY={positionY}>
      {gridMessage && gridMessage.message && (
        <Message
          fadeIn
          text={removeSlackExpression(gridMessage.message.text)}
          iconUrl={member?.iconUrl}
          name={member?.name}
          color={gridMessage.color}
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
