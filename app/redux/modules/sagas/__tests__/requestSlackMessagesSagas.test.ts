import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { getUnixTime } from 'date-fns';
import { requestMessagesAPISuccess } from '../../api/slackMessages';
import {
  requestSlackMessages,
  lastRequestTimeSelector,
  selectedChannelSelector,
} from '../requestSlackMessagesSagas';
import {
  MessageFromSlack,
  BotProfile,
  getWebClientInstance,
  getWebClientBotInstance,
} from '../../../../modules/util/requests/webClient';
import { enqueueMessageQueue } from '../../app/messageQueue';
import { SlackMessage, Members } from '../../types';
import { setLastRequestTime } from '../../app/requestInfo';
import createRootReducer from '../../reducer';
import saga from '../../saga';
import { addMembers } from '../../app/members';
import { selectChannel } from '../../ui/selectChannelUI';

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
  // ユーザー以外からのメッセージ（イベントキャプション、botなど）
  const mockOtherMessages: MessageFromSlack[] = [
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

  const mockSlackApiResponse = {
    messages: mockOtherMessages.concat(mockUserMessages),
  };
  const mockChannelId = 'mockChannel';

  test(
    'メッセージ 取得 & メンバーライブラリ更新の全体フローテスト\n' +
      '1. storeからSlackのキー情報を取得\n' +
      '2. storeから最終リクエスト日時を取得\n' +
      '3. Slack APIからメッセージリストを取得\n' +
      '4. (sub)storeから現在の登録済みメンバーリストを取得\n' +
      '5. (sub)storeからSlackのキー情報を取得（サブルーチンなのでもう一度行う）\n' +
      '6. (sub)未登録メンバーAからのメッセージの情報からSlack APIにユーザー情報の問合せ\n' +
      '7. (sub)未登録メンバーBからのメッセージの情報からSlack APIにユーザー情報の問合せ\n' +
      '8. (sub)APIから取得したメンバーの情報をstoreに保存（fetchがmockなので同じユーザー２名）\n' +
      '9. 取得したSlackのメッセージを直前API取得メッセージstoreにセットする\n' +
      '10. 取得したメッセージリストを逆順にしてメッセージキューにenqueする\n' +
      '11. 最終リクエスト日時に現在時刻を挿入する',
    () => {
      const web = getWebClientInstance('test token');
      const botWeb = getWebClientBotInstance('test token');
      const mockUnixTime = getUnixTime(new Date()).toString();

      return (
        expectSaga(saga)
          .provide([
            [
              matchers.call.fn(botWeb.conversations.history),
              mockSlackApiResponse,
            ],
            [matchers.call.fn(web.users.info), mockUserInfoResponse],
          ])
          .withReducer(createRootReducer({} as any))
          // .select(authInfoSelector)
          .select(lastRequestTimeSelector)
          .call(botWeb.conversations.history, {
            channel: mockChannelId,
            oldest: mockUnixTime,
          })
          .select(selectedChannelSelector)
          .call(web.users.info, {
            user: mockUserMessages[0].user,
          })
          .call(web.users.info, {
            user: mockUserMessages[1].user,
          })
          .put(addMembers([expectedMember, expectedMember] as Members))
          .put(requestMessagesAPISuccess(mockUserMessages))
          .put(enqueueMessageQueue(mockUserMessages.reverse()))
          .dispatch(selectChannel(mockChannelId))
          .dispatch(setLastRequestTime(mockUnixTime))
          .dispatch(requestSlackMessages())
          .run()
      );
    }
  );
});
