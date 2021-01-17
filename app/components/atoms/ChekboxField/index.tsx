import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { styleConst } from '../../../modules/styles/styleConst';

type Props = {
  label?: string;
  name: string;
};

const CheckboxField: React.FC<Props> = ({ name, label }) => {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <StyledField id={name} name={name} type="checkbox" component="input" />
    </>
  );
};

const Label = styled.label`
  font-size: 2rem;
  color: ${styleConst.basicWhite};
  font-family: ${styleConst.englishFont};
`;
const StyledField = styled(Field)<any>`
  margin-left: 10px;
  border: none;
  vertical-align: top;
`;

export default CheckboxField;
