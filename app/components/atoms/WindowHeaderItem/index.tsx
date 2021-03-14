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
`;

export default WindowHeaderItem;
