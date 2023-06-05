import { expectSaga, ExpectApi } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';
import { select } from 'redux-saga/effects';
import createRootReducer from '../../reducer';
import {
  requestSlackChannelInfoSuccess,
  requestSlackChannelInfoFail,
  REQUEST_SLACK_CHANNEL_INFO_SUCCESS,
  REQUEST_SLACK_CHANNEL_INFO_FAIL,
} from '../../api/slackChannelInfo';
import { routes } from '../../../../modules/constants/routes';
import { showAlert } from '../../common/alert';
import { recieveToken } from '../../user/authInfo';
import {
  writeChannelHistoriesToStorage,
  historyLoaded,
  overflowHistory,
} from '../../app/channelHistories';
import { ENQUEUE_MESSAGES, watchNewChannel } from '../../app/messageQueue';
import { SlackChannelInfo } from '../../types';
import { makeWatchWindow } from '../../../effects/window';
import { selectChannel } from '../../ui/selectChannelUI';
import { setLastRequestTime } from '../../app/requestInfo';
import {
  startWatchSagas,
  startWatch,
  selectedChannelSelector,
  authInfoSelector,
  slackChannelInfoSelector,
  channelHistoriesSelector,
} from '../startWatchSagas';
import { createMaxSizeHistories } from './fixture/channelHistories.fixture';
import {
  requestMessagesAPIFail,
  requestMessagesAPISuccess,
} from '../../api/slackMessages';
import { lastRequestTimeSelector } from '../requestSlackMessagesSagas';
import {
  mockInvokeReset,
  mockInvokeWithImplementation,
} from '../../../../lib/test/mockInvoke';
import appConst from '../../../../modules/constants/appConst';

describe('Slack APIからチャンネル情報を取得するフローのテスト', () => {
  function* saga() {
    yield startWatchSagas[0]; // storageを動かさないためflowのみ
  }
  // ユーザー以外からのメッセージ（イベントキャプション、botなど）
  const mockChannelInfoResponse = {
    ok: true,
    channel: {
      id: 'testId',
      name: 'channelName',
    },
  };
  const mockChannelId = 'mockChannel';
  const mockRequestTime = ''; // testでは空文字列になる
  const mockToken = { token: '123', botToken: 'bot' };
  const mockOldest = '1';
  const successCaseAPIMocks = () => {
    mockInvokeWithImplementation((channel, args) => {
      switch (channel) {
        case appConst.IPC_SLACK_CHANNEL_INFO:
          return Promise.resolve(mockChannelInfoResponse);
        case appConst.IPC_SLACK_POST_MESSAGE:
          return Promise.resolve();
        case appConst.IPC_SLACK_CONVERSATIONS_HISTORY:
          return Promise.resolve({ messages: [] });
        default:
          return Promise.reject();
      }
    });
  };
  const failChannelInfoAPIMocks = (errorMessage: string) => {
    mockInvokeWithImplementation((channel, args) => {
      switch (channel) {
        case appConst.IPC_SLACK_CHANNEL_INFO:
          throw new Error(errorMessage);
        case appConst.IPC_SLACK_POST_MESSAGE:
          return Promise.resolve();
        case appConst.IPC_SLACK_CONVERSATIONS_HISTORY:
          return Promise.resolve({ messages: [] });
        default:
          return Promise.reject();
      }
    });
  };

  afterEach(() => {
    mockInvokeReset();
  });

  describe('正常に処理が終了した場合のフロー', () => {
    describe('直前までwatchしたchannelと違うチャンネル or 初回watchのケース', () => {
      let expect: ExpectApi;
      beforeEach(() => {
        successCaseAPIMocks();
        expect = expectSaga(saga)
          .provide([[select(lastRequestTimeSelector), mockOldest]])
          .withReducer(createRootReducer({} as any));
      });

      test(
        'SlackのWatch対象チャンネル取得フロー' +
          '- storeから選択中チャンネルの情報を取得' +
          '- storeの認証情報からtokenを取得' +
          '- storeの監視中チャンネル情報を取得' +
          '- Slackにキー情報にあるチャンネルの情報をリクエスト' +
          '- bot存在確認のためのlimit1のAPIリクエスト' +
          '- bot存在確認リクエストではAPIリクエスト成功のアクションは発火されない' +
          '- リクエスト成功時、チャンネル情報をstateに保存' +
          '- storeからチャンネル履歴を取得' +
          '- チャンネル情報をstorageに保存' +
          '- メッセージキューと表示メッセージ情報を削除' +
          '- Windowの透明化' +
          '- 現在時刻を前回リクエスト時刻にセット' +
          '- WATCH_SCREENに画面遷移',
        () => {
          return (
            expect
              .select(selectedChannelSelector)
              .select(authInfoSelector)
              .select(slackChannelInfoSelector)
              .not.put.like({
                action: { type: REQUEST_SLACK_CHANNEL_INFO_FAIL },
              })
              .put(
                requestSlackChannelInfoSuccess({
                  id: mockChannelInfoResponse.channel.id,
                  name: mockChannelInfoResponse.channel.name,
                })
              )

              // requestSlackMessagesFlow start
              .put(requestMessagesAPISuccess([]))
              .not.put.like({ action: { type: ENQUEUE_MESSAGES } }) // 疎通確認時はスキップされる
              // requestSlackMessagesFlow end

              .select(channelHistoriesSelector)
              .put(
                writeChannelHistoriesToStorage([
                  {
                    id: mockChannelInfoResponse.channel.id,
                    name: mockChannelInfoResponse.channel.name,
                  },
                ])
              )
              .put(watchNewChannel())
              .put(makeWatchWindow())
              .put(setLastRequestTime(mockRequestTime))
              .put(push(routes.WATCH_SCREEN))
              .dispatch(selectChannel(mockChannelId))
              .dispatch(recieveToken(mockToken))
              .dispatch(startWatch())
              .run()
          );
        }
      );
    });

    describe('直前までwatchしたchannelを再度watchするケース', () => {
      const previousChannel: SlackChannelInfo = {
        id: 'testId',
        name: 'channelName', // mockのレスポンスと同じid, name
        error: false,
        error_message: '',
        loaded: true,
        loading: false,
      };
      let expect: ExpectApi;

      beforeEach(() => {
        successCaseAPIMocks();
        expect = expectSaga(saga)
          .withReducer(createRootReducer({} as any))
          .dispatch(requestSlackChannelInfoSuccess(previousChannel))
          .provide([[select(lastRequestTimeSelector), mockOldest]]);
      });

      test('新規チャンネルwatchのActionがDispatchされない', () => {
        return expect
          .select(slackChannelInfoSelector)
          .not.put(watchNewChannel())
          .dispatch(startWatch())
          .run();
      });
    });

    describe('履歴保存可能数の限界まで履歴がある時', () => {
      let expect: ExpectApi;

      beforeEach(() => {
        successCaseAPIMocks();
        expect = expectSaga(saga)
          .withReducer(createRootReducer({} as any))
          .dispatch(historyLoaded(createMaxSizeHistories())) // 上限数まで履歴を作る
          .provide([[select(lastRequestTimeSelector), mockOldest]]);
      });

      test('新しい履歴がpushされた後に溢れた数のデキューを行う', () => {
        return expect
          .put(overflowHistory(1)) // 1つ履歴が溢れる
          .dispatch(startWatch())
          .run();
      });
    });
  });

  describe('SlackのWatch対象チャンネル取得 例外発生ケース', () => {
    let expect: ExpectApi;
    beforeEach(() => {
      expect = expectSaga(saga).withReducer(createRootReducer({} as any));
    });
    describe('本アプリのbotが参加していないチャンネルをWatchした時', () => {
      const errorMessage = 'not_in_channel';
      beforeEach(() => {
        failChannelInfoAPIMocks(errorMessage);
      });

      test('bot招待説明画面に遷移する', () => {
        return expect.not.put
          .like({
            action: { type: REQUEST_SLACK_CHANNEL_INFO_SUCCESS },
          })
          .put(
            requestMessagesAPIFail({
              error: true,
              error_message: errorMessage,
            })
          )
          .put(push(routes.RECOMMEND_BOT))
          .dispatch(selectChannel(mockChannelId))
          .dispatch(recieveToken(mockToken))
          .dispatch(startWatch())
          .run();
      });
    });

    describe('想定外のエラーが発生した時', () => {
      const errorMessage = 'mock error message';
      beforeEach(() => {
        failChannelInfoAPIMocks(errorMessage);
      });

      test('Fail用Actionがdisaptchされる', () => {
        return expect.not.put
          .like({
            action: { type: REQUEST_SLACK_CHANNEL_INFO_SUCCESS },
          })
          .put(
            requestSlackChannelInfoFail({
              error: true,
              error_message: errorMessage,
            })
          )
          .put(showAlert(errorMessage))
          .dispatch(selectChannel(mockChannelId))
          .dispatch(recieveToken(mockToken))
          .dispatch(startWatch())
          .run();
      });
    });
  });
});
