import React from 'react';
import styled from 'styled-components';
import { FlatMenu } from '../../types';
import { styleConst } from '../../../modules/styles/styleConst';

type Props = {
  menu: FlatMenu;
};

const FlatMenuButton: React.FC<Props> = ({ menu }) => {
  return <Button onClick={menu.action}>{menu.label}</Button>;
};

const Button = styled.button`
  width: 100%;
  height: 40px;
  text-align: left;
  padding: 0 0 0 15px;
  background-color: ${styleConst.thinPink};
  color: ${styleConst.messageLabel};
  border: none;
  font-size: 16px;

  :hover {
    background-color: ${styleConst.thinGreen};
  }
`;

export default FlatMenuButton;
