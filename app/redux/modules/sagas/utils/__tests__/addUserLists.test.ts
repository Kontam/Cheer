import assert from 'power-assert';
import { select, call, all, put } from 'redux-saga/effects';
import {
  memberSelector,
  addUserListFlow,
  authInfoSelector,
} from '../addUserListFlow';
import { getWebClientInstance } from '../../../../../modules/util/requests/webClient';
import { addMembers } from '../../../app/members';
import { SlackMessage } from '../../../types';

describe('Slack APIからメッセージを取得するフローのテスト', () => {
  const mockUserMessages: SlackMessage[] = [
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
  const mockUserInfoResponse = {
    user: {
      id: 'USER_A',
      profile: {
        image_72: 'abc',
        display_name: 'name',
        real_name: 'real_name',
      },
    },
  };
  const expectedMember = {
    id: mockUserInfoResponse.user.id,
    iconUrl: mockUserInfoResponse.user.profile.image_72,
    name: mockUserInfoResponse.user.profile.display_name,
    real_name: mockUserInfoResponse.user.profile.real_name,
  };

  test(
    '未登録メンバー追加サブフローの単体テスト　想定通りにeffectがdispatchされることを確認する\n' +
      '1. storeのメンバー情報を取得\n' +
      '2. Slackのキー情報を取得\n' +
      '3. 未登録メンバーメッセージの数だけSlack API Fetchがcallされる\n' +
      '4. 未登録メンバー全員の情報を登録する',
    () => {
      const web = getWebClientInstance('test token');
      const gen = addUserListFlow(mockUserMessages);
      const authInfo = {
        token: 'test token',
      };
      const calls = [
        call(web.users.info, { user: mockUserMessages[0].user }),
        call(web.users.info, { user: mockUserMessages[1].user }),
      ];
      assert.deepEqual(gen.next().value, select(memberSelector));
      assert.deepEqual(gen.next([] as any).value, select(authInfoSelector));
      assert.deepEqual(gen.next(authInfo as any).value, all(calls));
      assert.deepEqual(
        gen.next([mockUserInfoResponse, mockUserInfoResponse] as any).value,
        put(addMembers([expectedMember, expectedMember]))
      );
    }
  );
});
