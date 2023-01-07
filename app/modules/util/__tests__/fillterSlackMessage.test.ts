import assert from 'power-assert';
import { MessageFromSlack, BotProfile } from '../requests/webClient';
import filterSlackMessages from '../filterSlackMessage';

describe('reducerのテスト', () => {
  const mockMessages: MessageFromSlack[] = [
    {
      attachments: '',
      bot_id: 'id1',
      bot_profile: {} as BotProfile,
      team: 'team',
      text: 'text',
      ts: 'a',
      type: 'message',
      user: 'botuser',
    },
    {
      type: 'message',
      subtype: 'channel_join',
      ts: '1588139034.000700',
      user: 'U012A0B27CP',
      text: '<@U012A0B27CP>さんがチャンネルに参加しました',
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
    {
      attachments: '',
      bot_id: 'id2',
      bot_profile: {} as BotProfile,
      team: 'team',
      text: 'text',
      ts: 'a',
      type: 'message',
      user: 'botuser2',
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
    {
      blocks: '',
      client_msg_id: '5',
      team: 'team',
      text: '<@U012A0B27CP>:emoji:',
      ts: '12345',
      type: 'message',
      user: 'USER_D',
    },
  ];

  test('apiからの取得したメッセージリストがユーザーからのメッセージのみにフィルタされる', () => {
    const expected: any = [mockMessages[2], mockMessages[4], mockMessages[5]];
    assert.deepEqual(filterSlackMessages(mockMessages), expected);
  });
});
