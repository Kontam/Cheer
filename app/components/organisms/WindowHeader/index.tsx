import React from 'react';
import styled from 'styled-components';
import { styleConst } from '../../../modules/styles/styleConst';
import { HeaderMenu, FlatMenu } from '../../types';
import ScreenMenu from '../ScreenMenu';
import WindowHeaderItem from '../../atoms/WindowHeaderItem';

type Props = {
  headerMenus: HeaderMenu[];
  screenMenus: FlatMenu[];
};

const WindowHeader: React.FC<Props> = ({ headerMenus, screenMenus }) => {
  return (
    <Container>
      <List>
        {headerMenus.map((menu) => (
          <Item key={menu.name}>
            <WindowHeaderItem menu={menu} />
          </Item>
        ))}
      </List>
      <ScreenMenu menus={screenMenus} />
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
