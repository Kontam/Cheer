import { useDispatch } from 'react-redux';
import { openPreference } from '../../../redux/effects/app';
import { FlatMenu } from '../../types';
import { useCommonWindowHeader } from '../../organisms/WindowHeader/useCommonWindoHeader';
import { logout } from '../../../redux/modules/sagas/loginSagas';

export function useHomeHeaderMenu() {
  const dispatch = useDispatch();
  const { headerMenus } = useCommonWindowHeader();

  const screenMenus: FlatMenu[] = [
    {
      name: 'preference',
      action: () => dispatch(openPreference()),
      label: 'preference',
    },
    {
      name: 'logout',
      action: () => dispatch(logout()),
      label: 'logout',
    },
  ];

  return { headerMenus, screenMenus };
}
