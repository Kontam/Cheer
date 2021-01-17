import React from 'react';
import styled from 'styled-components';
import UserIcon from '../UserIcon';

type Props = {
  src?: string;
  alt?: string;
  bgColor: string;
};

const MessageIcon: React.FC<Props> = ({ src, alt, bgColor }) => {
  return (
    <BackGround color={bgColor}>
      <UserIcon src={src} alt={alt} />
    </BackGround>
  );
};

export default MessageIcon;

const BackGround = styled.div<{ color: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
`;
