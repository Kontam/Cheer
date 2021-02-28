import React from 'react';
import { useDispatch } from 'react-redux';
import { HeaderMenu } from '../../types';
import Presentational from './WindowHeader';
import { quitApp } from '../../../redux/effects/app';

export const WindowHeader: React.VFC = () => {
  const dispatch = useDispatch();

  const menus: HeaderMenu[] = [
    {
      name: 'quit',
      iconNode: <h1>a</h1>,
      action: () => dispatch(quitApp()),
    },
  ];

  return <Presentational menus={menus} />;
};

export default WindowHeader;
