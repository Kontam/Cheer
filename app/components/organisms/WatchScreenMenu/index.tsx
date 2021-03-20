import React from 'react';
import styled from 'styled-components';
import ScreenMenu from '../ScreenMenu';
import { useWatchScreenMenu } from './useWatchScreenMenu';
import buttonIcon from '../../../static/image/megaphoneIcon.svg';
import { styleConst } from '../../../modules/styles/styleConst';

type Props = {
  handleMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  handleMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
};

const WatchScreenMenu: React.FC<Props> = ({
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const { menus, handleMenuButtonClick } = useWatchScreenMenu();
  return (
    <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Button onClick={handleMenuButtonClick}>
        <Img src={buttonIcon} alt="menu" />
      </Button>
      <ScreenMenu menus={menus} />
    </Container>
  );
};

const Container = styled.div``;

const Button = styled.button`
  background-color: ${styleConst.basicWhite};
  border: 3px solid ${styleConst.basicPink};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
  cursor: pointer;

  :hover {
    background-color: ${styleConst.lightGreen};
  }
`;

const Img = styled.img`
  width: 30px;
`;

export default WatchScreenMenu;
