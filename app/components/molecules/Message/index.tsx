/* eslint-disable react/destructuring-assignment */
import React, { memo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { getRandomColor } from '../../../modules/util/getRandomColor';
import MessageIcon from '../../atoms/MessageIcon';
import { styleConst } from '../../../modules/styles/styleConst';
import { removeUnusedExpression } from '../../../modules/util/removeSlackExpression';
import { getMessageLengthWithEmoji } from './getMessageLengthWithEmoji';
import { MessageProps, useMessage } from './__tests__/useMessage';

const Message: React.FC<MessageProps> = (props) => {
  const { values } = useMessage(props);
  /*
  TODO: ...置換の必要性を検討してから再使用するか決める
  const formattedText =
    messageLengthWithEmoji > 65
      ? `${removedText.slice(0, 65)}...`
      : removedText;
      */
  return (
    <Container {...props.exAttributes}>
      <IconWrapper>
        <MessageIcon bgColor={values.containerColor} src={props.iconUrl} />
      </IconWrapper>
      <MessageBox color={values.containerColor} fadeIn={!!props.fadeIn}>
        <Name>{props.name}</Name>
        <Text
          length={values.messageLength}
          dangerouslySetInnerHTML={{ __html: values.displayMessage }}
        />
      </MessageBox>
    </Container>
  );
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeInAnimation = (props: any) =>
  css`
    ${fadeIn} .1s ease-in
  `;

const Container = styled.div`
  display: flex;
  position: relative;
  padding-left: 40px;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 0;
  z-index: 100;
`;

const MessageBox = styled.div<{
  color: string;
  fadeIn: boolean;
}>`
  position: relative;
  animation: ${(props) => (props.fadeIn ? fadeInAnimation : '')};
  background-color: ${(props) => props.color};
  border-radius: 3px;
  color: ${styleConst.messageLabel};
  height: 80px;
  padding: 0 20px;
  box-shadow: 2px 6px 6px rgba(0, 0, 0, 0.3);
  width: 270px;
  padding: 5px 10px 5px 48px;
`;

const Name = styled.p`
  font-size: 12px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
`;

const Text = styled.p<{ length: number }>`
  padding-top: ${({ length }) => {
    if (length < 20) return '6px';
    if (length < 27) return '8px';
    if (length < 45) return '6px';
    return '5px';
  }};
  height: 60px;
  display: flex;
  align-items: flex-start;
  word-break: break-all;
  line-height: ${({ length }) => {
    if (length < 20) return '1.3';
    if (length < 27) return '1.3';
    if (length < 45) return '1.2';
    return '1.1';
  }};
  font-size: ${({ length }) => {
    if (length < 23) return '18px';
    if (length < 27) return '16px';
    if (length < 45) return '14px';
    return '12px';
  }};
`;

export default memo(Message);
