import assert from 'power-assert';
import { createStore } from 'redux';
import gridMessages, {
  INITIAL_STATE,
  enqueueMessageQueue,
  dequeueMessageQueue,
} from '../../messageQueue';
import { SlackMessage } from '../../../types';

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
  const mockExtraMessages: SlackMessage[] = [
    {
      blocks: '',
      client_msg_id: '3',
      team: 'team',
      text: 'text3',
      ts: '12345',
      type: 'message',
      user: 'USER_C',
    },
    {
      blocks: '',
      client_msg_id: '4',
      team: 'team',
      text: 'text4',
      ts: '12345',
      type: 'message',
      user: 'USER_D',
    },
  ];

  test('messageQueueを0からエンキューすると追加したメッセージのみの配列ができる', () => {
    store.dispatch(enqueueMessageQueue(mockMessages));
    const state = store.getState();
    assert.deepEqual(state, mockMessages);
  });

  test('messageQueueにエンキューすると、既存のメッセージの後ろにメッセージが追加される', () => {
    store.dispatch(enqueueMessageQueue(mockExtraMessages));
    const state = store.getState();
    assert.deepEqual(state, mockMessages.concat(mockExtraMessages));
  });

  test('デキューのアクションによって指定した数分のメッセージが先頭から消去される', () => {
    store.dispatch(dequeueMessageQueue(2));
    const state = store.getState();
    assert.deepEqual(state, mockExtraMessages);
  });
});
