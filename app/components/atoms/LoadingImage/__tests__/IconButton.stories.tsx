import React from 'react';
import styled from 'styled-components';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import LoadingImageComponent from '../index';
import { styleConst } from '../../../../modules/styles/styleConst';

export default {
  title: 'atoms/LoadingImage',
  decorators: [withKnobs],
};

export const LoadingImage = () => (
  <Window>
    <LoadingImageComponent
      isLoading={boolean('isLoading', true)}
      size={number('size', 40)}
    />
  </Window>
);

const Window = styled.div`
  background-color: ${styleConst.basicPink};
  width: 500px;
  height: 500px;
`;
