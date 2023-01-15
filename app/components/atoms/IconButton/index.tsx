import React from 'react';
import styled from 'styled-components';
import { styleConst } from '../../../modules/styles/styleConst';

type Props = {
  src: string;
  onClick: React.MouseEventHandler;
};

const IconButton: React.FC<Props> = ({ src, onClick }) => {
  return (
    <Button type="button" onClick={onClick}>
      <Img src={src} />
    </Button>
  );
};

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  background: ${styleConst.basicGreen};
  border-radius: 50%;
  outline: 0;
  border: none;
  box-shadow: 0 3px 6px ${styleConst.basicShadow};
  transition: 0.2s;
  cursor: pointer;

  :hover {
    background-color: ${styleConst.lightGreen};
  }
`;
export const Img = styled.img`
  width: 25px;
  height: 25px;
`;

export default IconButton;
