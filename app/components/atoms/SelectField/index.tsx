import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { styleConst } from '../../../modules/styles/styleConst';

export const Input = styled.input``;

type Props = {
  name: string;
  options: Option[];
};

export type Option = {
  label: string;
  value: string;
};

const SelectField: React.FC<Props> = ({ name, options }) => {
  return (
    <StyledField name={name} type="text" component="select">
      {options.map((option) => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledField>
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
`;

export default SelectField;
