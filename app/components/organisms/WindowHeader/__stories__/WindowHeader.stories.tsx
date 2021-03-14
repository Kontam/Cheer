import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import { actions } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import WindowHeaderComponent from '..';
import { FlatMenu, HeaderMenu } from '../../../types';
import screenMenuUI, {
  openScreenMenu,
} from '../../../../redux/modules/ui/screenMenuUI';
import menuIcon from '../../../../static/image/menuIcon.svg';

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
      iconNode: <img src={menuIcon} alt="menu" />,
      action: () => dispatch(openScreenMenu()),
    },
  ];
  return (
    <WindowHeaderComponent
      withMenu={boolean('withMenu', true)}
      headerMenus={menus}
      screenMenus={screenMenus}
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
