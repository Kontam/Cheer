import { useDispatch } from 'react-redux';
import { quitApp } from '../../../redux/effects/app';
import { FlatMenu } from '../../types';
import { useCommonWindowHeader } from '../../organisms/WindowHeader/useCommonWindoHeader';

export function useHomeHeaderMenu() {
  const dispatch = useDispatch();
  const { headerMenus } = useCommonWindowHeader();

  const screenMenus: FlatMenu[] = [
    {
      name: 'quit',
      action: () => dispatch(quitApp()),
      label: 'quit',
    },
  ];

  return { headerMenus, screenMenus };
}
