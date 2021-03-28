import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
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
  return (
    <WatchScreenMenu
      handleMouseLeave={action('handleMouseLeave')}
      handleMouseEnter={action('handleMouseEnter')}
      handleMenuItemClick={action('handleMenuItemClick')}
    />
  );
};

export const withReduxAndScreenMenu = () => {
  return (
    <Provider store={store}>
      <WindowHeaderWithScreenMenu />
    </Provider>
  );
};
