import React from 'react';
import styled from 'styled-components';
import { SlackEmoji } from '../../../modules/util/requests/webClient';
import {
  SlideMessages,
  HorizonConveyor,
  Members,
} from '../../../redux/modules/types';
import ConveyorCell from '../../molecules/ConveyorCell';

type Props = {
  slideMessages: SlideMessages;
  setting: HorizonConveyor;
  members: Members;
  emoji: SlackEmoji;
};

const HrizonConveyor: React.FC<Props> = ({
  slideMessages,
  setting,
  members,
  emoji,
}) => {
  const { amount } = setting;
  return (
    <Container length={amount}>
      {slideMessages.map((message, index) => (
        // keyはアニメーションのために意図的に再レンダーさせたいのでindex変更ごとに変わる
        <ConveyorCell
          key={
            message.message.client_msg_id +
            index.toString() +
            slideMessages.length.toString()
          }
          direction={index === slideMessages.length - 1 ? 'up' : 'left'}
          slideMessage={message}
          length={amount}
          member={members.find((member) => member.id === message.message.user)}
          emoji={emoji}
        />
      ))}
    </Container>
  );
};

const Container = styled.div<{ length: number }>`
  width: ${(props) => 100 + 100 / props.length}vw;
  margin-left: -${(props) => 2 + 100 / props.length}vw;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  bottom: 20px;
`;

export default HrizonConveyor;
