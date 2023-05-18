import { expectSaga, ExpectApi } from 'redux-saga-test-plan';
import uniqBy from 'lodash.uniqby';
import * as matchers from 'redux-saga-test-plan/matchers';
import { all } from 'redux-saga/effects';
import { channelHistoriesSagas } from '../channelHistories';
import {
  readChannelHistoriesFromStorage,
  historyLoaded,
} from '../../app/channelHistories';
import { readStore } from '../../../../modules/util/electronStore';
import { createHistoriesDeplicated } from './fixture/channelHistories.fixture';
import { selectTab, selectChannel } from '../../ui/selectChannelUI';
import { mockPreload } from '../../../../lib/test/mockPreload';

function* saga() {
  yield all(channelHistoriesSagas);
}

beforeAll(() => {
  mockPreload();
});

describe('writeChannelHistoriesToStorage 履歴をstrageに保存する', () => {});

describe('readChannelHistoriesFromStorage strageから履歴をロードする', () => {
  describe('履歴がstrageに存在しない時', () => {
    let expect: ExpectApi;
    beforeEach(() => {
      expect = expectSaga(saga)
        .provide([[matchers.call.fn(readStore), null]])
        .dispatch(readChannelHistoriesFromStorage());
    });
    test('何も処理が行われない(最初のActionがdispatchされない）', () => {
      return expect.not.put.actionType(historyLoaded([])).run();
    });
  });

  describe('履歴が空配列の時', () => {
    let expect: ExpectApi;
    beforeEach(() => {
      expect = expectSaga(saga)
        .provide([[matchers.call.fn(readStore), []]])
        .dispatch(readChannelHistoriesFromStorage());
    });
    test('何も処理が行われない(最初のActionがdispatchされない）', () => {
      return expect.not.put.actionType(historyLoaded([])).run();
    });
  });

  describe('履歴がstrageに存在する時(重複履歴を含む）', () => {
    let expect: ExpectApi;
    const mockHistories = createHistoriesDeplicated();
    const expectedUniqHistories = [mockHistories[0], mockHistories[1]];
    beforeEach(() => {
      expect = expectSaga(saga)
        .provide([[matchers.call.fn(readStore), mockHistories]])
        .dispatch(readChannelHistoriesFromStorage());
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
