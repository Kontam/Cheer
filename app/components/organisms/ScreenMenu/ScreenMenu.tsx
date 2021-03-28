import React from 'react';
import FlatMenuList from '../../molecules/FlatMenuList';
import { FlatMenu } from '../../types';

export type Props = {
  menus: FlatMenu[];
  isOpen: boolean;
};

const ScreenMenu: React.FC<Props> = ({ menus, isOpen }) => {
  return <>{isOpen && <FlatMenuList menus={menus} />}</>;
};

export default ScreenMenu;
