import React from 'react';
import { QA_ATTRIBUTES } from '../../../modules/testUtil/testAttributes';
import FlatMenuList from '../../molecules/FlatMenuList';
import { FlatMenu } from '../../types';

export type Props = {
  menus: FlatMenu[];
  isOpen: boolean;
};

const ScreenMenu: React.FC<Props> = ({ menus, isOpen }) => {
  return (
    <>
      {isOpen && (
        <FlatMenuList menus={menus} exAttributes={QA_ATTRIBUTES.SCREEN_MENU} />
      )}
    </>
  );
};

export default ScreenMenu;
