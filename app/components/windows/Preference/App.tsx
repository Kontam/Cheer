import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import Preference from '../../pages/Preference';
import GlobalStyle from '../../../modules/styles/GlobalStyle';

export type Props = {
  store: Store;
};

const Root = ({ store }: Props) => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Preference />
    </Provider>
  );
};

export default hot(Root);
