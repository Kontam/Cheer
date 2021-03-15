import React from 'react';
import { HeaderMenu } from '../../types';
import { useScreenMenu } from '../ScreenMenu/useScreenMenu';
import menuIcon from '../../../static/image/menuIcon.svg';
import Icon from '../../atoms/Icon';

export function useCommonWindowHeader() {
  const { isOpen, openScreenMenu, closeScreenMenu } = useScreenMenu();

  // 開いた時にclose用のイベントハンドラをセットする処理(useScreenMenuにあるべき？)
  const headerMenus: HeaderMenu[] = [
    {
      name: 'open',
      iconNode: <Icon src={menuIcon} />,
      action: () => (isOpen ? closeScreenMenu() : openScreenMenu()),
    },
  ];

  return { headerMenus };
}
