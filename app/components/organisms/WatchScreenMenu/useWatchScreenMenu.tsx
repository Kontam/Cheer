import { useDispatch } from 'react-redux';
import { openPreference, quitApp } from '../../../redux/effects/app';
import { pushSelectChannel } from '../../../redux/modules/api/slackChannelList';
import { FlatMenu } from '../../types';
import { useScreenMenu } from '../ScreenMenu/useScreenMenu';

export const useWatchScreenMenu = () => {
  const dispatch = useDispatch();
  const { isOpen, openScreenMenu, closeScreenMenu } = useScreenMenu();

  const menus: FlatMenu[] = [
    {
      name: 'preference',
      action: () => dispatch(openPreference()),
      label: 'preference',
    },
    {
      name: 'select channel',
      action: () => dispatch(pushSelectChannel()),
      label: 'select channel',
    },
    {
      name: 'quit',
      action: () => dispatch(quitApp()),
      label: 'quit',
    },
  ];

  const handleMenuButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (isOpen) {
      closeScreenMenu();
      return;
    }
    openScreenMenu();
  };

  return { menus, handleMenuButtonClick };
};
