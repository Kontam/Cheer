import React from 'react';
import { HeaderMenu } from '../../types';
import { useScreenMenu } from '../ScreenMenu/useScreenMenu';

export function useCommonWindowHeader() {
  const { isOpen, openScreenMenu, closeScreenMenu } = useScreenMenu();

  // 開いた時にclose用のイベントハンドラをセットする処理(useScreenMenuにあるべき？)
  const headerMenus: HeaderMenu[] = [
    {
      name: 'open',
      iconNode: <h1>a</h1>,
      action: () => (isOpen ? closeScreenMenu() : openScreenMenu()),
    },
  ];

  return { headerMenus };
}
