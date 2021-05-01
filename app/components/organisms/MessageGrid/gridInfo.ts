import { Position } from '../../types';

type GridInfo = {
  cellNum: number;
} & Position;

/**
 * グリッドの情報
 * 原則左上から順番に0〜番号を採番する
 */
const gridInfo: GridInfo[] = [
  {
    cellNum: 0,
    positionX: 'left',
    positionY: 'top',
  },
  {
    cellNum: 1,
    positionX: 'center',
    positionY: 'top',
  },
  {
    cellNum: 2,
    positionX: 'right',
    positionY: 'top',
  },
  {
    cellNum: 3,
    positionX: 'left',
    positionY: 'center',
  },
  {
    cellNum: 4,
    positionX: 'center',
    positionY: 'center',
  },
  {
    cellNum: 5,
    positionX: 'right',
    positionY: 'center',
  },
  {
    cellNum: 6,
    positionX: 'left',
    positionY: 'bottom',
  },
  {
    cellNum: 7,
    positionX: 'center',
    positionY: 'bottom',
  },
  {
    cellNum: 8,
    positionX: 'right',
    positionY: 'bottom',
  },
];

export default gridInfo;
