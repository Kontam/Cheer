import React from 'react';
import styled from 'styled-components';
import { styleConst } from '../../../modules/styles/styleConst';

export const Input = styled.input``;

type Props = {
  label: string;
};

const FieldTitle: React.FC<Props> = ({ label }) => {
  return <Title>{label}</Title>;
};

const Title = styled.p`
  font-size: 2rem;
  color: ${styleConst.basicWhite};
  font-family: ${styleConst.englishFont};
`;

export default FieldTitle;
