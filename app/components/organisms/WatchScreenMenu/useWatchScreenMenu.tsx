import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { openPreference, quitApp } from '../../../redux/effects/app';
import { pushSelectChannel } from '../../../redux/modules/api/slackChannelList';
import { FlatMenu } from '../../types';
import { useScreenMenu } from '../ScreenMenu/useScreenMenu';

export const useWatchScreenMenu = (
  handleMenuItemClick?: React.MouseEventHandler<HTMLButtonElement>
) => {
  const dispatch = useDispatch();
  const { isOpen, openScreenMenu, closeScreenMenu } = useScreenMenu();

  const menus: FlatMenu[] = [
    {
      name: 'preference',
      action: (e) => {
        if (handleMenuItemClick) handleMenuItemClick(e);
        dispatch(openPreference());
      },
      label: 'preference',
    },
    {
      name: 'select channel',
      action: (e) => {
        if (handleMenuItemClick) handleMenuItemClick(e);
        dispatch(pushSelectChannel());
      },
      label: 'select channel',
    },
    {
      name: 'quit',
      action: (e) => {
        if (handleMenuItemClick) handleMenuItemClick(e);
        dispatch(quitApp());
      },
      label: 'quit',
    },
  ];

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
  const handleMenuButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    document.addEventListener('click', handleClickDocument);
    return isOpen ? handleCloseScreenMenu() : openScreenMenu();
  };

  return { menus, handleMenuButtonClick, menuButtonRef };
};
