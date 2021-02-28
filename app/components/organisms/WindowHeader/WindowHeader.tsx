import React from 'react';
import styled from 'styled-components';
import { styleConst } from '../../../modules/styles/styleConst';
import HeaderMenuItem from '../../atoms/WindowHeaderItem';
import { HeaderMenu } from '../../types';

type Props = {
  menus: HeaderMenu[];
};

const WindowHeader: React.FC<Props> = ({ menus }) => {
  return (
    <Container>
      <List>
        {menus.map((menu) => (
          <Item key={menu.name}>
            <HeaderMenuItem menu={menu} />
          </Item>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${styleConst.lightPink};
  width: 100%;
  height: 30px;
  -webkit-app-region: drag;
`;

const List = styled.ul``;

const Item = styled.li``;

export default WindowHeader;
