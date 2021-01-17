import React, { useCallback } from 'react';
import styled from 'styled-components';
import { styleConst } from '../../../modules/styles/styleConst';
import checkIcon from '../../../static/image/checkIcon.svg';

export type SettingCell = {
  cellNum: number;
  isActive: boolean;
};

type Props = {
  settingCell: SettingCell;
  onActiveCellClick: (cellNum: number) => void;
  onInactiveCellClick: (cellNum: number) => void;
};

const CellSetting: React.FC<Props> = ({
  settingCell,
  onActiveCellClick,
  onInactiveCellClick,
}) => {
  const handleActiveCellClick = useCallback(
    () => onActiveCellClick(settingCell.cellNum),
    [settingCell.cellNum, onActiveCellClick]
  );
  const handleInactiveCellClick = useCallback(
    () => onInactiveCellClick(settingCell.cellNum),
    [settingCell.cellNum, onInactiveCellClick]
  );
  const onClick = settingCell.isActive
    ? handleActiveCellClick
    : handleInactiveCellClick;

  return (
    <CellButton type="button" onClick={onClick} isActive={settingCell.isActive}>
      {settingCell.isActive ? <Icon src={checkIcon} alt="checked" /> : null}
    </CellButton>
  );
};

const Icon = styled.img``;

const CellButton = styled.button<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 60px;
  background-color: ${({ isActive }) =>
    isActive ? styleConst.lightGreen : styleConst.lightPink};
  border: solid 1px
    ${({ isActive }) =>
      isActive ? styleConst.basicGreen : styleConst.basicPink};

  :focus {
    z-index: 1000;
  }

  :hover {
    background-color: ${({ isActive }) =>
      isActive ? styleConst.thinGreen : styleConst.thinPink};
  }
`;

export default CellSetting;
