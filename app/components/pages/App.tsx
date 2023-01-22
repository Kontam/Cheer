import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Store } from 'redux';
import { globalStyle } from '../../modules/styles/GlobalStyle';
import Routes from '../../modules/Routes';

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => {
  return (
    <Provider store={store}>
      {/*
          styled-components 5.2 has issue about createGlobalStyle
          This is workaround.
          See: https://github.com/styled-components/styled-components/issues/3146
      */}
      <style>{globalStyle}</style>
      {/* <GlobalStyle /> */}
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
};

export default hot(Root);
