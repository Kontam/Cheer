import assert from 'power-assert';
import { createStore } from 'redux';
import gridMessages, {
  INITIAL_STATE,
  setGridMessages,
  initializeGridMessages,
  hideGridMessages,
} from '../../gridMessages';
import { GridMessage, SlackMessage } from '../../../types';

describe('reducerのテスト', () => {
  const store = createStore(gridMessages, INITIAL_STATE);
  const mockMessages: SlackMessage[] = [
    {
      blocks: '',
      client_msg_id: '1',
      team: 'team',
      text: 'text1',
      ts: '12345',
      type: 'message',
      user: 'USER_A',
    },
    {
      blocks: '',
      client_msg_id: '2',
      team: 'team',
      text: 'text2',
      ts: '12345',
      type: 'message',
      user: 'USER_B',
    },
  ];

  const activeCell = [0, 2, 6, 9];
  const expectedInitializeGridMessages = activeCell.map(
    (cellNum): GridMessage => ({
      cell: cellNum,
      showing: false,
      color: '',
    })
  );

  test('初期化アクション　使用するセルの番号を引数に初期化をdispatchすると、番号に対応したセルに非表示状態データができる', () => {
    store.dispatch(initializeGridMessages(activeCell));
    const state = store.getState();
    assert.deepEqual(state, expectedInitializeGridMessages);
  });

  test('セットアクション　挿入データと、グリッドメッセージのセル番号が一致していればそのセルが上書きされる', () => {
    const data = [
      {
        cell: activeCell[1],
        message: mockMessages[0],
        showing: true,
        color: '#AAAAAA',
      },
      {
        cell: activeCell[2],
        message: mockMessages[0],
        showing: true,
        color: '#AAAAAA',
      },
    ];
    const expected = [
      expectedInitializeGridMessages[0],
      data[0],
      data[1],
      expectedInitializeGridMessages[3],
    ];

    store.dispatch(setGridMessages(data));
    const state = store.getState();
    assert.deepEqual(state, expected);
  });

  test('非表示アクション 指定したセル番号のデータの表示フラグがfalseになる', () => {
    store.dispatch(hideGridMessages([2, 6]));
    const hiddenData = [
      {
        cell: activeCell[1],
        message: mockMessages[0],
        showing: false,
        color: '#AAAAAA',
      },
      {
        cell: activeCell[2],
        message: mockMessages[0],
        showing: false,
        color: '#AAAAAA',
      },
    ];
    const expected = [
      expectedInitializeGridMessages[0],
      hiddenData[0],
      hiddenData[1],
      expectedInitializeGridMessages[3],
    ];
    const state = store.getState();
    assert.deepEqual(state, expected);
  });
});
