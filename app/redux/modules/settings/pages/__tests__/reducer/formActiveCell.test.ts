import assert from 'power-assert';
import { createStore } from 'redux';
import formActiveCell, {
  removeFormActiveCell,
  addFormActiveCell,
} from '../../formActiveCell';

describe('formActiveCell Reducerテスト', () => {
  const store = createStore(formActiveCell, []);
  test('引数の数値がstateに追加される', () => {
    store.dispatch(addFormActiveCell(1));
    const state = store.getState();
    assert.deepEqual(state, [1]);
  });

  test('remove　引数の数値がstateから削除される', () => {
    store.dispatch(removeFormActiveCell(1));
    const state = store.getState();
    assert.deepEqual(state, []);
  });
});
