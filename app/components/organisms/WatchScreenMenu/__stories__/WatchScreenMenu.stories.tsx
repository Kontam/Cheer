import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { withKnobs } from '@storybook/addon-knobs';
import WatchScreenMenu from '..';
import screenMenuUI from '../../../../redux/modules/ui/screenMenuUI';

export default {
  title: 'organisms/WatchScreenMenu',
  decorators: [withKnobs],
};

const store = createStore(
  combineReducers({ ui: combineReducers({ screenMenuUI }) })
);

const WindowHeaderWithScreenMenu = () => {
  return <WatchScreenMenu />;
};

export const withReduxAndScreenMenu = () => {
  return (
    <Provider store={store}>
      <WindowHeaderWithScreenMenu />
    </Provider>
  );
};
