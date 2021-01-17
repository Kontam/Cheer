import React from 'react';
import styled from 'styled-components';
import { withKnobs, text } from '@storybook/addon-knobs';
import FieldTitleComponent from '../index';

export default {
  title: 'atoms/FieldTitle',
  decorators: [withKnobs],
};

export const FieldTitle = () => (
  <BackGround>
    <FieldTitleComponent label={text('label', 'Field Title')} />
  </BackGround>
);

const BackGround = styled.div`
  background-color: #f490a7;
  height: 500px;
  width: 100%;
  padding: 50px;
`;
