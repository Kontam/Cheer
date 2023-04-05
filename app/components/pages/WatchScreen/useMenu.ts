import React from 'react';
import { useDispatch } from 'react-redux';
import {
  makeClickableWindow,
  makeUnClickableWindow,
} from '../../../redux/effects/app';

export const useMenu = () => {
  const dispatch = useDispatch();
  const handleMenuButtonMouseEnter: React.MouseEventHandler<
    HTMLDivElement
  > = () => {
    dispatch(makeClickableWindow());
  };
  const handleMenuButtonMouseLeave: React.MouseEventHandler<
    HTMLDivElement
  > = () => {
    dispatch(makeUnClickableWindow());
  };
  const handleMenuItemClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    dispatch(makeUnClickableWindow());
  };
  const hasMenu = process.platform !== 'darwin';
  return {
    hasMenu,
    handleMenuButtonMouseEnter,
    handleMenuButtonMouseLeave,
    handleMenuItemClick,
  };
};
