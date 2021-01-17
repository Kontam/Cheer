import React from 'react';
import styled from 'styled-components';
import { styleConst } from '../../../modules/styles/styleConst';

const WindowHeader: React.FC = () => {
  return <Container />;
};

const Container = styled.div`
  background-color: ${styleConst.lightPink};
  width: 100%;
  height: 30px;
  -webkit-app-region: drag;
`;

export default WindowHeader;
