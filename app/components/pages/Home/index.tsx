import React from 'react';
import SelectChannel from '../../organisms/SelectChannel';
import WindowHeader from '../../organisms/WindowHeader';
import { useHomeHeaderMenu } from './useHomeHeaderMenu';

const Home: React.FC = () => {
  const { headerMenus, screenMenus } = useHomeHeaderMenu();
  return (
    <>
      <WindowHeader headerMenus={headerMenus} screenMenus={screenMenus} />
      <SelectChannel />
    </>
  );
};

export default Home;
