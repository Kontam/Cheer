import React from 'react';
import ScreenSetting from '../../organisms/ScreenSetting';
import WindowHeader from '../../organisms/WindowHeader';
import { usePreferenceHeaderMenu } from './usePreferenceHeaderMenu';

const Preference: React.FC = () => {
  const { headerMenus, screenMenus } = usePreferenceHeaderMenu();
  return (
    <>
      <WindowHeader headerMenus={headerMenus} screenMenus={screenMenus} />
      <ScreenSetting />
    </>
  );
};

export default Preference;
