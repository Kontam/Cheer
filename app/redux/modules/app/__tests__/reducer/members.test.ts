import assert from 'power-assert';
import { createStore } from 'redux';
import members, {
  INITIAL_STATE,
  addMembers,
  removeMembers,
} from '../../members';
import { Member } from '../../../types';

describe('reducerのテスト', () => {
  const store = createStore(members, INITIAL_STATE);
  const mockMembers: Member[] = [
    {
      id: 'MOCKID1',
      real_name: 'mockScreenName1',
      name: 'mockName1',
      iconUrl: 'https://mockIconURL1',
    },
    {
      id: 'MOCKID2',
      real_name: 'mockScreenName2',
      name: 'mockName2',
      iconUrl: 'https://mockIconURL2',
    },
  ];
  const mockExtraMembers: Member[] = [
    {
      id: 'MOCKID3',
      real_name: 'mockScreenName3',
      name: 'mockName3',
      iconUrl: 'https://mockIconURL3',
    },
    {
      id: 'MOCKID4',
      real_name: 'mockScreenName4',
      name: 'mockName4',
      iconUrl: 'https://mockIconURL4',
    },
  ];

  test('stateが空の状態でメンバー追加アクションを実行するとメンバーが追加される', () => {
    store.dispatch(addMembers(mockMembers));
    const state = store.getState();
    assert.deepEqual(state, mockMembers);
  });

  test('stateにすでにメンバーが存在する状態でメンバー追加アクションを実行するとメンバーが追加される', () => {
    store.dispatch(addMembers(mockExtraMembers));
    const state = store.getState();
    assert.deepEqual(state, mockMembers.concat(mockExtraMembers));
  });

  test('IDの配列を渡されてメンバー削除アクションを実行すると、一致するIDのメンバーが全て削除される', () => {
    store.dispatch(removeMembers(mockExtraMembers.map((member) => member.id)));
    const state = store.getState();
    assert.deepEqual(state, mockMembers);
  });
});
