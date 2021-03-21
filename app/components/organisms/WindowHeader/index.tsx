import React from 'react';
import styled from 'styled-components';
import { styleConst } from '../../../modules/styles/styleConst';
import { HeaderMenu, FlatMenu } from '../../types';
import ScreenMenu from '../ScreenMenu';
import WindowHeaderItem from '../../atoms/WindowHeaderItem';

type Props = {
  withMenu?: boolean;
  headerMenus?: HeaderMenu[];
  screenMenus?: FlatMenu[];
};

const WindowHeader: React.FC<Props> = ({
  headerMenus,
  screenMenus,
  withMenu = false,
}) => {
  return (
    <Container>
      <Draggable />
      {withMenu && headerMenus && screenMenus && (
        <MenuContainer>
          <List>
            {headerMenus.map((menu) => (
              <Item key={menu.name}>
                <WindowHeaderItem menu={menu} />
              </Item>
            ))}
          </List>
          {screenMenus.length && (
            <ScreenMenuContainer>
              <ScreenMenu menus={screenMenus} />
            </ScreenMenuContainer>
          )}
        </MenuContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
  background-color: ${styleConst.lightPink};
  width: 100%;
  height: 30px;
  padding: 0 10px;
`;

// windowsではdrag上のbuttonをクリックできないので領域を分ける
const Draggable = styled.div`
  height: 30px;
  -webkit-app-region: drag;
  width: 100%;
`;

const MenuContainer = styled.div``;

const List = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 30px;
`;

const Item = styled.li`
  margin-left: 30px;
`;

const ScreenMenuContainer = styled.div`
  position: absolute;
  right: 0;
  top: 30px;
  box-shadow: rgba(193, 118, 95, 0.3) -3px 3px 6px;
`;

export default WindowHeader;
