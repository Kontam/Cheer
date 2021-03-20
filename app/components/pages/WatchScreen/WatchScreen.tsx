import React from 'react';
import styled from 'styled-components';
import MessageBoard from '../../organisms/MessageBoard';
import WatchScreenMenu from '../../organisms/WatchScreenMenu';

type Props = {
  hasMenu: boolean;
};

const WatchScreen: React.FC<Props> = ({ hasMenu }) => {
  return (
    <Screen>
      {hasMenu && (
        <MenuContainer>
          <WatchScreenMenu />
        </MenuContainer>
      )}
      <MessageBoard />
    </Screen>
  );
};

const Screen = styled.div`
  position: relative;
  pointer-events: none;
`;

const MenuContainer = styled.div`
  position: absolute;
  top: 100px;
  right: 100px;
`;

export default WatchScreen;
