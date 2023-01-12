import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { styleConst } from '../../../modules/styles/styleConst';

export const Input = styled.input``;

type Props = {
  name: string;
  placeholder: string;
  disabled?: 'disabled' | 'enabled';
  onChange?: React.KeyboardEventHandler;
};

const TextField: React.FC<Props> = ({
  name,
  placeholder,
  disabled,
  onChange,
}) => {
  return (
    <StyledField
      name={name}
      placeholder={placeholder}
      type="text"
      component="input"
      disabled={disabled}
      onChange={onChange}
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
  color: ${({ disabled }) =>
    disabled === 'disabled' ? styleConst.basicWhite : styleConst.basicLabel};

  ::placeholder {
    color: ${({ disabled }) =>
      disabled === 'disabled' ? styleConst.basicWhite : styleConst.lightLabel};
  }

  :disabled {
    background-color: ${styleConst.lightGreen};
    opacity: 0.5;
  }
`;

export default TextField;
