import React from 'react';
import { addDecorator } from '@storybook/react';
import GlobalStyle from '../app/modules/styles/GlobalStyle';

// 一部のreducerがelectronに依存しているので全体をProviderでwrapするのはやめる
// 必要なstoryのなかで必要なreducerだけ使用したstoreでProviderを使う

addDecorator((storyFn) => (
  <div>
    <GlobalStyle />
    {storyFn()}
  </div>
));
