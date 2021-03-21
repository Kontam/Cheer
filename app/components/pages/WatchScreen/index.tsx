import React from 'react';
import styled from 'styled-components';
import MessageBoard from '../../organisms/MessageBoard';
import WatchScreenMenu from '../../organisms/WatchScreenMenu';
import { useMenu } from './useMenu';

const WatchScreen: React.FC = () => {
  const {
    hasMenu,
    handleMenuButtonMouseEnter,
    handleMenuButtonMouseLeave,
  } = useMenu();
  return (
    <Screen>
      {hasMenu && (
        <MenuContainer>
          <WatchScreenMenu
            handleMouseEnter={handleMenuButtonMouseEnter}
            handleMouseLeave={handleMenuButtonMouseLeave}
          />
        </MenuContainer>
      )}
      <MessageBoard />
    </Screen>
  );
};

const Screen = styled.div`
  position: relative;
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 100px;
  right: 100px;
`;

export default WatchScreen;
