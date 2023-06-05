import { ExpectApi, expectSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';
import { WebClient } from '@slack/web-api';
import { getWebClientInstance } from '../../../../modules/util/requests/webClient';
import createRootReducer from '../../reducer';
import {
  channelListRequestSuccess,
  channelListRequestFail,
  channelListRequest,
} from '../../api/slackChannelList';
import { routes } from '../../../../modules/constants/routes';
import { makeListWindow } from '../../../effects/window';
import { TokenInfo } from '../../types';
import {
  ipcLoginComplete,
  ipcLogoutComplete,
  logoutWorkspace,
  recieveToken,
} from '../../user/authInfo';
import { login, loginSaga, logout } from '../loginSagas';
import { writeAuthTokenToStorage } from '../authStorageSagas';
import {
  requestAppUserInfoSuccess,
  REQUEST_APP_USER_INFO_FAIL,
} from '../../api/appUserInfo';
import { mockSlackChannelListResponse } from './fixture/slackChannelList.fixture';
import { mockUserProfileGetResponse } from './fixture/userProfileGet.fixture';
import {
  emojiListRequest,
  emojiListRequestSuccess,
} from '../../api/slackEmojiList';
import { mockEmojiListResponse } from './fixture/emojiList.fixture';
import {
  mockInvokeReset,
  mockInvokeWithImplementation,
} from '../../../../lib/test/mockInvoke';
import appConst from '../../../../modules/constants/appConst';

const mockToken: TokenInfo = { token: 'mockToken', botToken: 'mockBotToken' };

afterEach(() => {
  mockInvokeReset();
});

describe('ログイン/ログアウトフローの確認 正常系', () => {
  let expect: ExpectApi;
  beforeEach(() => {
    mockInvokeWithImplementation((channel) => {
      switch (channel) {
        case appConst.IPC_SLACK_USER_PROFILE:
          return Promise.resolve(mockUserProfileGetResponse);
        case appConst.IPC_SLACK_EMOJI_LIST:
          return Promise.resolve(mockEmojiListResponse);
        case appConst.IPC_SLACK_CHANNEL_LIST:
          return Promise.resolve(mockSlackChannelListResponse);
        default:
          return Promise.reject();
      }
    });
    expect = expectSaga(loginSaga).withReducer(createRootReducer({} as any));
  });

  test(
    'ログイン処理 tokenの正当性を確認した後に保存し、HOME画面に遷移する\n' +
      '- payloadのtokenをstoreに保存する\n' +
      '- stateをLoadingに更新\n' +
      '- Slack APIにチャンネルリストをリクエストしてtokenの正当性を確認\n' +
      '- APIからの返却値をそのままreducerに渡してチャンネルリストを保存\n' +
      '- Slack APIにEmojiリストをリクエスト\n' +
      '- Emojiリストをreducerに渡して保存\n' +
      '- Slack APIにアプリ利用ユーザー情報をリクエスト\n' +
      '- アプリ利用ユーザーのAPIレスポンスをそのままSucessに渡す\n' +
      '- tokenをelectoron-storeで保存\n' +
      '- 画面サイズをList用に変更\n' +
      '- HOME画面に遷移\n' +
      '- login完了をmainプロセスに通知',
    () => {
      return expect
        .put(recieveToken(mockToken))
        .put(channelListRequest())
        .put(channelListRequestSuccess(mockSlackChannelListResponse.channels))
        .put(emojiListRequest())
        .put(emojiListRequestSuccess(mockEmojiListResponse.emoji))
        .put(requestAppUserInfoSuccess(mockUserProfileGetResponse))
        .not.put.like({ action: { type: REQUEST_APP_USER_INFO_FAIL } })
        .put(writeAuthTokenToStorage(mockToken))
        .put(makeListWindow())
        .put(push(routes.HOME))
        .put(ipcLoginComplete())
        .dispatch(login(mockToken))
        .run();
    }
  );

  test('ログイン処理が２連続で動作しないことを確認する', () => {
    return expect
      .put(recieveToken(mockToken))
      .not.put(recieveToken(mockToken)) // 2回dispatchされないことを確認する
      .dispatch(login(mockToken))
      .dispatch(login(mockToken))
      .run();
  });

  test('ログアウト処理がログイン処理の完了以降でないと動作しないことを確認する', () => {
    return expect.not.put(logoutWorkspace()).dispatch(logout()).run();
  });

  test(
    'ログアウト処理 storeとstorageからtokenの情報を削除してLogin画面に戻る\n' +
      '1. storeからtokenを消去\n' +
      '2. storageのtokenを空文字列で上書き\n' +
      '3. LOGIN画面に遷移\n' +
      '4. logout完了をmainプロセスに通知',
    () => {
      return expect
        .put(logoutWorkspace())
        .put(writeAuthTokenToStorage({ token: '', botToken: '' }))
        .put(push(routes.LOGIN))
        .put(ipcLogoutComplete())
        .dispatch(login(mockToken))
        .dispatch(logout())
        .run();
    }
  );
});

describe('ログイン/ログアウトフローの確認 異常系', () => {
  describe('チャンネルリストAPIでエラーが発生した時', () => {
    let expect: ExpectApi;
    let webCl: WebClient;
    const errorResponse: any = new Error('mock error');
    errorResponse.data = { error: 'error message' };
    beforeEach(() => {
      mockInvokeWithImplementation(() => {
        return Promise.reject(errorResponse);
      });
      webCl = getWebClientInstance('token');
      expect = expectSaga(loginSaga)
        .withReducer(createRootReducer({} as any))
        .dispatch(login(mockToken));
    });

    test('チャンネルリスト取得成功アクションがdispathされない', () => {
      return expect.not.put(channelListRequestSuccess(errorResponse)).run();
    });

    test('チャンネルリスト取得失敗アクションが実行される', () => {
      return expect.put(channelListRequestFail('error message')).run();
    });

    test('その後にlogoutが要求されても動作しない', () => {
      return expect.dispatch(logout()).not.put(logoutWorkspace()).run();
    });

    test('ストレージのtoken削除が行われる', () => {
      return expect
        .put(writeAuthTokenToStorage({ token: '', botToken: '' }))
        .run();
    });
  });
});
