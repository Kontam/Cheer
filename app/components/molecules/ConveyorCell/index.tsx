import React from 'react';
import styled, { keyframes } from 'styled-components';
import { SlideMessage, Member } from '../../../redux/modules/types';
import Message from '../Message';
import removeSlackExpression from '../../../modules/util/removeSlackExpression';
import { QA_ATTRIBUTES } from '../../../modules/testUtil/testAttributes';

type Direction = 'left' | 'up';
type Props = {
  slideMessage?: SlideMessage;
  length: number;
  direction: Direction;
  member?: Member;
};

const ConveyorCell: React.FC<Props> = ({
  slideMessage,
  length,
  direction = 'left',
  member,
}) => {
  return (
    <Container length={length} direction={direction}>
      {slideMessage && slideMessage.message && (
        <Message
          color={slideMessage.color}
          text={removeSlackExpression(slideMessage.message.text)}
          iconUrl={member?.iconUrl}
          name={member?.name}
          exAttributes={QA_ATTRIBUTES.CONVEYOR_MESSAGE}
        />
      )}
    </Container>
  );
};

const slideToLeft = (props: { length: number }) => keyframes`
  0% {
    transform: translateX(${100 / props.length - 1}vw);
  }
  100% {
    transform: 0;
  }
`;

const slideUp = keyframes`
  0% {
    /* 動作検証して見た目が良い数値を入れた */
    transform: translateY(200px);
  }
  100% {
    transform: 0;
  }
`;

const Container = styled.div<{ length: number; direction: Direction }>`
  animation: 0.5s
    ${(props) => (props.direction === 'left' ? slideToLeft(props) : slideUp)}
    forwards ease-in-out;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: ${(props) => 100 / props.length}vw;
`;

export default ConveyorCell;
