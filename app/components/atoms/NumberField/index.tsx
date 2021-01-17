import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { styleConst } from '../../../modules/styles/styleConst';

export const Input = styled.input``;

type Props = {
  name: string;
  min?: number;
  max?: number;
  disabled?: boolean;
};

const NumberField: React.FC<Props> = ({ name, min, max, disabled }) => {
  return (
    <StyledField
      name={name}
      type="number"
      component="input"
      max={max}
      min={min}
      disabled={disabled}
    />
  );
};

const StyledField = styled(Field)<any>`
  border: none;
  border-radius: 3px;
  height: 40px;
  width: 100%;
  font-size: 2rem;
  padding-left: 10px;
  color: ${styleConst.basicLabel};

  :disabled {
    background-color: ${styleConst.lightGreen};
    opacity: 0.5;
  }
`;

export default NumberField;
