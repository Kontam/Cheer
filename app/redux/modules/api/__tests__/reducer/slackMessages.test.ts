import assert from 'power-assert';
import { createStore } from 'redux';
import slackMessages, {
  INITIAL_STATE,
  requestMessagesAPISuccess,
} from '../../slackMessages';
import { UserMessage } from '../../../../../modules/util/requests/webClient';
import { SlackMessages } from '../../../types';

describe('reducerのテスト', () => {
  const store = createStore(slackMessages, INITIAL_STATE);
  const mockMessages: UserMessage[] = [
    {
      blocks: '',
      client_msg_id: '2',
      team: 'team',
      text: 'text2',
      ts: '12345',
      type: 'message',
      user: 'USER_B',
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

  test('setアクションに渡されたペイロードがそのままstateにセットされる', () => {
    store.dispatch(requestMessagesAPISuccess(mockMessages));
    const state = store.getState();
    const expect: SlackMessages = {
      messages: mockMessages,
      loaded: true,
      loading: false,
      error: false,
      error_message: '',
    };
    assert.deepStrictEqual(state, expect);
  });
});
