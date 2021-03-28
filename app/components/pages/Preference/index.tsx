import React from 'react';
import ScreenSetting from '../../organisms/ScreenSetting';
import WindowHeader from '../../organisms/WindowHeader';
import { usePreferenceHeaderMenu } from './usePreferenceHeaderMenu';

const Preference: React.FC = () => {
  const { headerMenus } = usePreferenceHeaderMenu();
  return (
    <>
      <WindowHeader headerMenus={headerMenus} withMenu />
      <ScreenSetting />
    </>
  );
};

export default Preference;
