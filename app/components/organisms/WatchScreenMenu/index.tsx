import React from 'react';
import styled from 'styled-components';
import ScreenMenu from '../ScreenMenu';
import { useWatchScreenMenu } from './useWatchScreenMenu';

const WatchScreenMenu: React.FC = () => {
  const { menus, handleMenuButtonClick } = useWatchScreenMenu();
  return (
    <Container>
      <Button onClick={handleMenuButtonClick} />
      <ScreenMenu menus={menus} />
    </Container>
  );
};

const Container = styled.div``;

const Button = styled.button``;

export default WatchScreenMenu;
