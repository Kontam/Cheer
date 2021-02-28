import React from 'react';
import Presentational, { HeaderMenu } from './WindowHeader';

export const WindowHeader: React.VFC = () => {

  const menus: HeaderMenu[] = [{
    name: "quit",
    iconNode: <h1>a</h1>,
    action: () => console.log("quit")
  }];
  
  return <Presentational menus={menus} />;
}

export default WindowHeader;
