import React from 'react';
import styled from 'styled-components';
import { FlatMenu } from '../../types';
import FlatMenuItem from '../../atoms/FlatMenuItem';

type Props = {
  menus: FlatMenu[];
  exAttributes?: any;
};

const FlatMenuList: React.FC<Props> = ({ menus, exAttributes }) => {
  return (
    <List {...exAttributes}>
      <Item>
        {menus.map((menu) => (
          <FlatMenuItem key={menu.name} menu={menu} />
        ))}
      </Item>
    </List>
  );
};

const List = styled.ul`
  width: 160px;
`;
const Item = styled.li``;

export default FlatMenuList;
