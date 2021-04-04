import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { HeaderMenu } from '../../types';
import { useScreenMenu } from '../ScreenMenu/useScreenMenu';
import menuIcon from '../../../static/image/menuIcon.svg';
import closeIcon from '../../../static/image/closeIcon.svg';
import Icon from '../../atoms/Icon';
import { quitApp } from '../../../redux/effects/app';
import { QA_ATTRIBUTES } from '../../../modules/testUtil/testAttributes';

export function useCommonWindowHeader() {
  const { isOpen, openScreenMenu, closeScreenMenu } = useScreenMenu();
  const dispatch = useDispatch();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleClickDocument = (e: MouseEvent) => {
    if (!e.target) return;
    // targetがItemの要素か
    if (menuButtonRef.current?.contains(e.target as any)) {
      return;
    }
    handleCloseScreenMenu();
  };

  const handleCloseScreenMenu = () => {
    document.removeEventListener('click', handleClickDocument);
    closeScreenMenu();
  };
  const handleClickOpen = () => {
    document.addEventListener('click', handleClickDocument);
    return isOpen ? handleCloseScreenMenu() : openScreenMenu();
  };

  const headerMenus: HeaderMenu[] = [
    {
      name: 'open',
      iconNode: <Icon src={menuIcon} />,
      action: handleClickOpen,
      itemProps: { ref: menuButtonRef, ...QA_ATTRIBUTES.OPEN_MENU_ICON },
    },
    {
      name: 'close',
      iconNode: <Icon src={closeIcon} />,
      action: () => dispatch(quitApp()),
    },
  ];

  return { headerMenus };
}
