import React from 'react';
import styled from 'styled-components';
import loadingImage from '../../../static/image/loading.svg';

type Props = {
  isLoading: boolean;
  size?: number;
};

const LoadingImage: React.FC<Props> = ({ isLoading, size = 40 }) => {
  return (
    <Container size={size}>
      {isLoading ? <Img src={loadingImage} alt="loading" size={size} /> : null}
    </Container>
  );
};

const Img = styled.img<{ size: number }>`
  ${({ size }) => `
    height: ${size}px;
    width: ${size}px;
  `}
`;
const Container = styled.div<{ size: number }>`
  ${({ size }) => `
    height: ${size}px;
  `}
`;

export default LoadingImage;
