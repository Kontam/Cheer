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
          {screenMenus.length && <ScreenMenu menus={screenMenus} />}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: ${styleConst.lightPink};
  width: 100%;
  height: 30px;
  -webkit-app-region: drag;
`;

const List = styled.ul`
  display: flex;
  justify-content: flex-end;
`;

const Item = styled.li``;

export default WindowHeader;
