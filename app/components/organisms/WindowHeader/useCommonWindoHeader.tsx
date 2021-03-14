import React from 'react';
import { HeaderMenu } from '../../types';
import { useScreenMenu } from '../ScreenMenu/useScreenMenu';
import menuIcon from '../../../static/image/menuIcon.svg';

export function useCommonWindowHeader() {
  const { isOpen, openScreenMenu, closeScreenMenu } = useScreenMenu();

  // 開いた時にclose用のイベントハンドラをセットする処理(useScreenMenuにあるべき？)
  const headerMenus: HeaderMenu[] = [
    {
      name: 'open',
      iconNode: <img src={menuIcon} alt="menu" />,
      action: () => (isOpen ? closeScreenMenu() : openScreenMenu()),
    },
  ];

  return { headerMenus };
}
