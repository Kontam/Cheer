import React from 'react';
import { useDispatch } from 'react-redux';
import { quitApp } from '../../../redux/effects/app';
import Icon from '../../atoms/Icon';
import { HeaderMenu } from '../../types';
import closeIcon from '../../../static/image/closeIcon.svg';

export function useLoginHeaderMenu() {
  const dispatch = useDispatch();
  const headerMenus: HeaderMenu[] = [
    {
      name: 'close',
      iconNode: <Icon src={closeIcon} />,
      action: () => dispatch(quitApp()),
    },
  ];

  return { headerMenus };
}
