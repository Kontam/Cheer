import assert from 'power-assert';
import { selectedChannelInfoSelector } from '../slackChannelList';

describe('selectedChannelInfoSelector', () => {
  const getState = (id: string) =>
    ({
      ui: {
        selectChannelUI: {
          selectedChannel: id,
        },
      },
      api: {
        slackChannelList: {
          channels: [
            {
              id: 'id1',
              name: 'name1',
            },
            {
              id: 'id2',
              name: 'name2',
            },
          ],
        },
      },
    } as any);

  describe('リストに存在するIDが選択中のチャンネルstateの場合', () => {
    const state = getState('id1');

    test('合致するチャンネル情報が返却される', () => {
      const result = selectedChannelInfoSelector(state as any);
      assert.deepStrictEqual(result, { id: 'id1', name: 'name1' });
    });
  });

  describe('リストに存在しないIDが選択中のチャンネルstateの場合', () => {
    const state = getState('invalid');

    test('nullが返却される', () => {
      const result = selectedChannelInfoSelector(state as any);
      assert.deepStrictEqual(result, null);
    });
  });
});
