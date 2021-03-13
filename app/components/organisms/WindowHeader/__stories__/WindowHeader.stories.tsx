import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import { actions } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import WindowHeaderComponent from '..';
import { FlatMenu, HeaderMenu } from '../../../types';
import screenMenuUI, {
  openScreenMenu,
} from '../../../../redux/modules/ui/screenMenuUI';

export default {
  title: 'organisms/WindowHeader',
  decorators: [withKnobs],
};

const screenMenus: FlatMenu[] = [
  {
    name: 'quit',
    action: () => actions('quit'),
    label: 'quit',
  },
];

const store = createStore(
  combineReducers({ ui: combineReducers({ screenMenuUI }) })
);

const WindowHeaderWithScreenMenu = () => {
  const dispatch = useDispatch();
  const menus: HeaderMenu[] = [
    {
      name: 'quit',
      iconNode: <h1>a</h1>,
      action: () => dispatch(openScreenMenu()),
    },
  ];
  return (
    <WindowHeaderComponent headerMenus={menus} screenMenus={screenMenus} />
  );
};

export const withReduxAndScreenMenu = () => {
  return (
    <Provider store={store}>
      <WindowHeaderWithScreenMenu />
    </Provider>
  );
};
