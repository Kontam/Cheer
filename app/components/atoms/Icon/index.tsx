import React from 'react';
import styled from 'styled-components';

export type Props = {
  src: string;
};

const Icon: React.FC<Props> = ({ src }) => {
  return <Img src={src} alt="menu" />;
};

export default Icon;

const Img = styled.img`
  height: 20px;
  width: 20px;
  cursor: inherit; // for button
`;
