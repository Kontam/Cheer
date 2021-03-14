import { FlatMenu, HeaderMenu } from '../../types';

export function usePreferenceHeaderMenu() {
  const headerMenus: HeaderMenu[] = [];
  const screenMenus: FlatMenu[] = [];

  return { headerMenus, screenMenus };
}
