import assert from 'power-assert';
import { createStore } from 'redux';
import slideMessages, {
  INITIAL_STATE,
  enqueueSlideMessages,
  dequeueSlideMessages,
} from '../../slideMessages';
import { SlackMessage, SlideMessages } from '../../../types';

describe('reducerのテスト', () => {
  const store = createStore(slideMessages, INITIAL_STATE);
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
  const mockSlideMessages: SlideMessages = mockMessages.map((message) => ({
    message,
    color: 'mockColorCode',
  }));
  const mockExtraSlideMessages: SlideMessages = mockExtraMessages.map(
    (message) => ({
      message,
      color: 'mockExtraColorCode',
    })
  );

  test('messageQueueを0からエンキューすると追加したメッセージのみの配列ができる', () => {
    store.dispatch(enqueueSlideMessages(mockSlideMessages));
    const state = store.getState();
    assert.deepEqual(state, mockSlideMessages);
  });

  test('messageQueueにエンキューすると、既存のメッセージの後ろにメッセージが追加される', () => {
    store.dispatch(enqueueSlideMessages(mockExtraSlideMessages));
    const state = store.getState();
    const expected = mockSlideMessages.concat(mockExtraSlideMessages);
    assert.deepEqual(state, expected);
  });

  test('デキューのアクションによって指定した数分のメッセージが先頭から消去される', () => {
    store.dispatch(dequeueSlideMessages(2));
    const state = store.getState();
    assert.deepEqual(state, mockExtraSlideMessages);
  });
});
