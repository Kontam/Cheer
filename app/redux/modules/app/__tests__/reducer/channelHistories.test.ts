import assert from 'power-assert';
import reducer, { overflowHistory } from '../../channelHistories';
import { ChannelHistories } from '../../../types';
import { requestSlackChannelInfoSuccess } from '../../../api/slackChannelInfo';

describe('channelHistories reducerテスト', () => {
  describe('History追加', () => {
    describe('既存stateに同一IDのデータが存在しない時', () => {
      let mockState: ChannelHistories = [];
      beforeEach(() => {
        mockState = [{ id: '1', name: 'name1' }];
      });
      test('新しい履歴が末尾に追加される', () => {
        const result = reducer(
          mockState,
          requestSlackChannelInfoSuccess({ id: '2', name: 'name2' })
        );
        assert.deepStrictEqual(result, [
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
        ]);
      });
    });

    describe('既存stateに同一IDのデータが存在する時', () => {
      let mockState: ChannelHistories = [];
      let result: ChannelHistories;
      beforeEach(() => {
        mockState = [
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
        ];
        result = reducer(
          mockState,
          requestSlackChannelInfoSuccess({ id: '1', name: 'name1' })
        );
      });
      test('同一IDのデータ以降のデータが繰り上がる', () => {
        assert.deepStrictEqual(result[0], { id: '2', name: 'name2' });
      });
      test('同一IDのデータが配列の末尾に移動する', () => {
        assert.deepStrictEqual(result[1], { id: '1', name: 'name1' });
      });
    });
  });

  describe('オーバーフローロジック', () => {
    describe('stateがpayload以上の要素数の時', () => {
      let mockState: ChannelHistories = [];
      beforeEach(() => {
        mockState = [
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
          { id: '3', name: 'name3' },
        ];
      });
      test('payloadの分だけstateの要素の若い方から除去される', () => {
        const result = reducer(mockState, overflowHistory(2));
        assert.deepStrictEqual(result, [{ id: '3', name: 'name3' }]);
      });
    });

    describe('stateがpayload以下の要素数の時', () => {
      let mockState: ChannelHistories = [];
      beforeEach(() => {
        mockState = [{ id: '1', name: 'name1' }];
      });
      test('要素数が0になる', () => {
        const result = reducer(mockState, overflowHistory(2));
        assert.deepStrictEqual(result, []);
      });
    });
  });
});
