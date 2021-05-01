import React from 'react';
import { QA_ATTRIBUTES } from '../../../modules/testUtil/testAttributes';
import ScreenSetting from '../../organisms/ScreenSetting';
import WindowHeader from '../../organisms/WindowHeader';
import { usePreferenceHeaderMenu } from './usePreferenceHeaderMenu';

const Preference: React.FC = () => {
  const { headerMenus } = usePreferenceHeaderMenu();
  return (
    <div {...QA_ATTRIBUTES.PREFERENCE}>
      <WindowHeader headerMenus={headerMenus} withMenu />
      <ScreenSetting />
    </div>
  );
};

export default Preference;
