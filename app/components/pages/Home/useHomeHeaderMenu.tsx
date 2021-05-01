import { useDispatch } from 'react-redux';
import { openPreference } from '../../../redux/effects/app';
import { FlatMenu } from '../../types';
import { useCommonWindowHeader } from '../../organisms/WindowHeader/useCommonWindoHeader';
import { logout } from '../../../redux/modules/sagas/loginSagas';
import { QA_ATTRIBUTES } from '../../../modules/testUtil/testAttributes';

export function useHomeHeaderMenu() {
  const dispatch = useDispatch();
  const { headerMenus } = useCommonWindowHeader();

  const screenMenus: FlatMenu[] = [
    {
      name: 'preference',
      action: () => dispatch(openPreference()),
      label: 'preference',
      itemProps: { ...QA_ATTRIBUTES.SCREEM_MENU_PREFERENCE } as any,
    },
    {
      name: 'logout',
      action: () => dispatch(logout()),
      label: 'logout',
    },
  ];

  return { headerMenus, screenMenus };
}
