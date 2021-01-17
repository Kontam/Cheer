import assert from 'power-assert';
import { createStore } from 'redux';
import requestInfo, {
  INITIAL_STATE,
  setRequestInfo,
  setLastRequestTime,
} from '../../requestInfo';
import { RequestInfo } from '../../../types';

describe('reducerのテスト', () => {
  const store = createStore(requestInfo, INITIAL_STATE);
  const mockRequestInfo: RequestInfo = {
    lastRequestTime: '12345678',
  };

  test('requestInfo全体のsetアクションのテスト 引数の値がそのままセットされる', () => {
    store.dispatch(setRequestInfo(mockRequestInfo));
    const state = store.getState();
    assert.deepEqual(state, mockRequestInfo);
  });

  test('最終リクエスト日時のみ更新するアクションのテスト 引数のstringがセットされる', () => {
    const newLastRequestTime = '456';
    store.dispatch(setLastRequestTime(newLastRequestTime));
    const state = store.getState();
    assert.deepEqual(state, { lastRequestTime: newLastRequestTime });
  });
});
