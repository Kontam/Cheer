import React from 'react';
import styled from 'styled-components';
import { FlatMenu } from '../../types';

type Props = {
  menu: FlatMenu;
};

const FlatMenuButton: React.FC<Props> = ({ menu }) => {
  return <Button onClick={menu.action}>{menu.label}</Button>;
};

const Button = styled.button``;

export default FlatMenuButton;
