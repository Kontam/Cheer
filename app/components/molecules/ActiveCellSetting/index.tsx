import React, { useMemo } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/no-cycle
import CellSetting, { SettingCell } from '../../atoms/CellSetting';

export type Props = {
  activeCell: number[];
  onFormActiveCellClick: (cellNum: number) => void;
  onFormInactiveCellClick: (cellNum: number) => void;
};

const createSettingCells = (activeCell: number[]): SettingCell[] => {
  const Cells = [];
  for (let i = 0; i < 9; i += 1) {
    Cells.push({
      cellNum: i,
      isActive: activeCell.some((activeCellNum) => activeCellNum === i),
    });
  }
  return Cells;
};

const ActiveCellSetting: React.FC<Props> = ({
  activeCell,
  onFormActiveCellClick,
  onFormInactiveCellClick,
}) => {
  const settingCells = useMemo(() => createSettingCells(activeCell), [
    activeCell,
  ]);
  return (
    <List>
      {settingCells.map((settingCell) => (
        <CellSetting
          key={settingCell.cellNum}
          settingCell={settingCell}
          onActiveCellClick={onFormActiveCellClick}
          onInactiveCellClick={onFormInactiveCellClick}
        />
      ))}
    </List>
  );
};

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 360px;
`;

export default ActiveCellSetting;
