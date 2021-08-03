import React, { memo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { getRandomColor } from '../../../modules/util/getRandomColor';
import MessageIcon from '../../atoms/MessageIcon';
import { styleConst } from '../../../modules/styles/styleConst';

type Props = {
  text: string;
  color?: 'ramdom' | string;
  fadeIn?: boolean;
  name?: string;
  iconUrl?: string;
  exAttributes?: any;
};

const Message: React.FC<Props> = ({
  text,
  iconUrl,
  name,
  fadeIn = false,
  color = 'random',
  exAttributes,
}) => {
  const containerColor = color === 'random' ? getRandomColor() : color;
  const formattedText = text.length > 65 ? `${text.slice(0, 65)}...` : text;
  return (
    <Container {...exAttributes}>
      <IconWrapper>
        <MessageIcon bgColor={containerColor} src={iconUrl} />
      </IconWrapper>
      <MessageBox color={containerColor} fadeIn={fadeIn}>
        <Name>{name}</Name>
        <Text length={formattedText.length}>{formattedText}</Text>
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
  font-size: 13px;
  width: 100%;
  overflow: hidden;
  font-weight: bold;
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
  font-weight: bold;
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
