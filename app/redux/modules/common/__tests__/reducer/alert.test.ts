import assert from 'power-assert';
import { createStore } from 'redux';
import reducer, { INITIAL_STATE, showAlert, hideAlert } from '../../alert';

describe('Alert reducerのテスト', () => {
  const store = createStore(reducer, INITIAL_STATE);
  const testMessage = 'testMessage';

  test('Alert表示アクションのテスト　メッセージを渡すと表示状態になる', () => {
    const expected = {
      showing: true,
      message: testMessage,
    };
    store.dispatch(showAlert(testMessage));
    const state = store.getState();
    assert.deepEqual(state, expected);
  });

  test('Alert非表示アクションのテスト　非表示状態になりメッセージが消去される', () => {
    const expected = {
      showing: false,
      message: testMessage,
    };
    store.dispatch(hideAlert());
    const state = store.getState();
    assert.deepEqual(state, expected);
  });
});
