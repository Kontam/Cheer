import React from 'react';
import { useSelector } from 'react-redux';
import { FlatMenu } from '../../types';
import Presentational from './ScreenMenu';

type Props = {
  menus: FlatMenu[];
};

const ScreenMenu: React.FC<Props> = ({ menus }) => {
  const isOpen = useSelector((state) => state.ui.screenMenuUI.isOpen);
  return <Presentational menus={menus} isOpen={isOpen} />;
};

export default ScreenMenu;
