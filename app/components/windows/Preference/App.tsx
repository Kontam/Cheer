import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import Preference from '../../pages/Preference';
import { globalStyle } from '../../../modules/styles/GlobalStyle';

export type Props = {
  store: Store;
};

const Root = ({ store }: Props) => {
  return (
    <Provider store={store}>
      {/*
          styled-components 5.2 has issue about createGlobalStyle
          This is workaround.
          See: https://github.com/styled-components/styled-components/issues/3146
      */}
      <style>{globalStyle}</style>
      {/* <GlobalStyle /> */}
      <Preference />
    </Provider>
  );
};

export default hot(Root);
