import React from 'react';
import { useDispatch } from 'react-redux';
import { closeWindow } from '../../../redux/effects/app';
import Icon from '../../atoms/Icon';
import { HeaderMenu } from '../../types';
import closeIcon from '../../../static/image/closeIcon.svg';

export function usePreferenceHeaderMenu() {
  const dispatch = useDispatch();
  const headerMenus: HeaderMenu[] = [
    {
      name: 'close',
      iconNode: <Icon src={closeIcon} />,
      action: () => dispatch(closeWindow()),
    },
  ];

  return { headerMenus };
}
