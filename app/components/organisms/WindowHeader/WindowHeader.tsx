import React from 'react';
import styled from 'styled-components';
import { styleConst } from '../../../modules/styles/styleConst';

export type HeaderMenu = {
  name: string,
  iconNode: any,
  action: () => void,
}

type Props = {
    menus: HeaderMenu[];
}

const WindowHeader: React.FC<Props> = ({ menus }) => {
  return <Container>
      <List>
    {
        menus.map(menu => (
            <Item><Button onClick={menu.action}>{menu.iconNode}</Button></Item>
        ))
    }
    </List>
  </Container>;
};

const Container = styled.div`
  background-color: ${styleConst.lightPink};
  width: 100%;
  height: 30px;
  -webkit-app-region: drag;
`;

const List = styled.ul``;

const Item = styled.li``;

const Button = styled.button``;

export default WindowHeader;
