import React from 'react';
import { addDecorator } from '@storybook/react';
import GlobalStyle from '../app/modules/styles/GlobalStyle';

addDecorator((storyFn) => (
  <div>
    <GlobalStyle />
    {storyFn()}
  </div>
));
