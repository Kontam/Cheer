import React from 'react';
import styled from 'styled-components';
import { FlatMenu } from '../../types';
import FlatMenuItem from '../../atoms/FlatMenuItem';

type Props = {
  menus: FlatMenu[];
};

const FlatMenuList: React.FC<Props> = ({ menus }) => {
  return (
    <List>
      <Item>
        {menus.map(menu => <FlatMenuItem menu={menu} />)}
      </Item>
    </List>
  );
};

const List = styled.ul``;
const Item = styled.li``;

export default FlatMenuList;
