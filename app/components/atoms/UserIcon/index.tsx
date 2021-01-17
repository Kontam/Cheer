import React from 'react';
import styled from 'styled-components';

type Props = {
  src?: string;
  alt?: string;
};

const UserIcon: React.FC<Props> = ({ src, alt }) => {
  return <Container>{src && <Img src={src} alt={alt} />}</Container>;
};

export default UserIcon;

const Container = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
`;

const Img = styled.img`
  width: 70px;
  height: 70px;
`;
