import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { routes } from '../../../modules/constants/routes';
import { openPreference, quitApp } from '../../../redux/effects/app';
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
      action: () => dispatch(push(routes.HOME)),
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
