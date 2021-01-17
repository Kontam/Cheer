import { ChannelHistories } from '../../../types';
import appConst from '../../../../../modules/constants/appConst';

/**
 * 最大数の履歴データを作成する
 */
export const createMaxSizeHistories = () => {
  const histories: ChannelHistories = [];
  for (let i = 0; i < appConst.CHANNEL_HISTORY_LIMIT; i += 1) {
    histories.push({
      id: `id${i}`,
      name: `name${i}`,
    });
  }
  return histories;
};

/**
 * 最大数で重複のある履歴データを作成する
 */
export const createHistoriesDeplicated = () => {
  const histories: ChannelHistories = [
    { id: '1', name: 'name1' },
    { id: '2', name: 'name2' },
    { id: '1', name: 'name1' },
    { id: '2', name: 'name2' },
  ];
  return histories;
};
