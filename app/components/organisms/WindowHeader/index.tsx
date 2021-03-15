import React from 'react';
import styled from 'styled-components';
import { styleConst } from '../../../modules/styles/styleConst';
import { HeaderMenu, FlatMenu } from '../../types';
import ScreenMenu from '../ScreenMenu';
import WindowHeaderItem from '../../atoms/WindowHeaderItem';

type Props = {
  withMenu: boolean;
  headerMenus: HeaderMenu[];
  screenMenus: FlatMenu[];
};

const WindowHeader: React.FC<Props> = ({
  headerMenus,
  screenMenus,
  withMenu = false,
}) => {
  return (
    <Container>
      {withMenu && (
        <>
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
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  background-color: ${styleConst.lightPink};
  width: 100%;
  height: 30px;
  padding: 0 10px;
  -webkit-app-region: drag;
`;

const List = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 30px;
`;

const Item = styled.li``;

const ScreenMenuContainer = styled.div`
  position: absolute;
  right: 0;
  top: 30px;
  box-shadow: rgba(193, 118, 95, 0.3) -3px 3px 6px;
`;

export default WindowHeader;
