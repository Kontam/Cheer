import React from 'react';
import { useDispatch } from 'react-redux';
import { HeaderMenu } from '../../types';
import { useScreenMenu } from '../ScreenMenu/useScreenMenu';
import menuIcon from '../../../static/image/menuIcon.svg';
import closeIcon from '../../../static/image/closeIcon.svg';
import Icon from '../../atoms/Icon';
import { quitApp } from '../../../redux/effects/app';

export function useCommonWindowHeader() {
  const { isOpen, openScreenMenu, closeScreenMenu } = useScreenMenu();
  const dispatch = useDispatch();

  // 開いた時にclose用のイベントハンドラをセットする処理(useScreenMenuにあるべき？)
  const headerMenus: HeaderMenu[] = [
    {
      name: 'open',
      iconNode: <Icon src={menuIcon} />,
      action: () => (isOpen ? closeScreenMenu() : openScreenMenu()),
    },
    {
      name: 'close',
      iconNode: <Icon src={closeIcon} />,
      action: () => dispatch(quitApp()),
    },
  ];

  return { headerMenus };
}
