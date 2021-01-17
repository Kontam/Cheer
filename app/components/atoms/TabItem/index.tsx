import React from 'react';
import styled from 'styled-components';
import { styleConst } from '../../../modules/styles/styleConst';

type Props = {
  label: string;
  selected?: boolean;
  onClick: React.MouseEventHandler;
};

const TabItem: React.FC<Props> = ({ label, onClick, selected = false }) => {
  return (
    <Container type="button" onClick={onClick} selected={selected}>
      {label}
    </Container>
  );
};

const Container = styled.button<{ selected: boolean }>`
  ${({ selected }) =>
    selected
      ? `
      background-color: ${styleConst.lightGreen};
      border: solid 1px ${styleConst.basicGreen};
    `
      : `
      background-color: ${styleConst.basicWhite};
      border: solid 1px ${styleConst.lightPink};
      :hover {
        border-bottom: solid 1px ${styleConst.lightPink};
        background-color: ${styleConst.thinPink};
      }
      cursor: pointer;
    `}
  outline-offset: -3px;
  height: 35px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: ${styleConst.darkGreen};
  transition: 0.2s;
`;

export default TabItem;
