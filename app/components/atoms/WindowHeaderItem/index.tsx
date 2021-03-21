import React from 'react';
import styled from 'styled-components';
import { HeaderMenu } from '../../types';

type Props = {
  menu: HeaderMenu;
};

const WindowHeaderItem: React.FC<Props> = ({ menu }) => {
  return <Button onClick={menu.action}>{menu.iconNode}</Button>;
};
const Button = styled.button`
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  height: 24px;
  width: 24px;
  align-items: center;
  -webkit-app-region: no-drag;
`;

export default WindowHeaderItem;
