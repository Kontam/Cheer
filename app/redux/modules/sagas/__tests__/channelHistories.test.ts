import { expectSaga, ExpectApi } from 'redux-saga-test-plan';
import uniqBy from 'lodash.uniqby';
import { all } from 'redux-saga/effects';
import { channelHistoriesSagas } from '../channelHistories';
import {
  readChannelHistoriesFromStorage,
  historyLoaded,
} from '../../app/channelHistories';
import { createHistoriesDeplicated } from './fixture/channelHistories.fixture';
import { selectTab, selectChannel } from '../../ui/selectChannelUI';
import { mockInvoke } from '../../../../lib/test/mockInvoke';

function* saga() {
  yield all(channelHistoriesSagas);
}
describe('writeChannelHistoriesToStorage 履歴をstrageに保存する', () => {});

describe('readChannelHistoriesFromStorage strageから履歴をロードする', () => {
  let expect: ExpectApi;
  beforeEach(() => {
    expect = expectSaga(saga).dispatch(readChannelHistoriesFromStorage());
  });
  describe('履歴がstrageに存在しない時', () => {
    beforeEach(() => {
      mockInvoke(undefined);
    });
    test('何も処理が行われない(最初のActionがdispatchされない）', () => {
      return expect.not.put.actionType(historyLoaded([])).run();
    });
  });

  describe('履歴が空配列の時', () => {
    beforeEach(() => {
      mockInvoke([]);
    });
    test('何も処理が行われない(最初のActionがdispatchされない）', () => {
      return expect.not.put.actionType(historyLoaded([])).run();
    });
  });

  describe('履歴がstrageに存在する時(重複履歴を含む）', () => {
    const mockHistories = createHistoriesDeplicated();
    const expectedUniqHistories = [mockHistories[0], mockHistories[1]];
    beforeEach(() => {
      mockInvoke(mockHistories);
    });

    test('重複した履歴を削除してstateに格納する', () => {
      return expect.call
        .fn(uniqBy)
        .put(historyLoaded(expectedUniqHistories))
        .run();
    });

    test('最新の履歴を選択中チャンネルにセットする', () => {
      return expect.put(selectChannel('2')).run();
    });

    test('選択中タブをhistoryにセットする', () => {
      return expect.put(selectTab('history')).run();
    });
  });
});
