import assert from 'power-assert';
import { Action } from 'redux-actions';
import { runSaga } from 'redux-saga';
import {
  getGridMessagesFromQueFlow,
  getGridMessagesFromQue,
  setGridMessages,
} from '../../gridMessages';
import { dequeueMessageQueue } from '../../messageQueue';
import { RootState, GridMessages, SlackMessage } from '../../../types';
import { UserMessage } from '../../../../../modules/util/requests/webClient';
import { colorPattern } from '../../../../../modules/util/getRandomColor';

describe('メッセージキューから表示メッセージを抽出するSagaのテスト', () => {
  const mockMessages: UserMessage[] = [
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
    {
      blocks: '',
      client_msg_id: '3',
      team: 'team',
      text: 'text3',
      ts: '123456',
      type: 'message',
      user: 'USER_C',
    },
  ];

  const mockState: Partial<RootState> = {
    app: {
      messageQueue: mockMessages,
      channelHistories: [],
      grid: {
        gridMessages: [
          {
            cell: 0,
            showing: false,
            color: '',
          },
          {
            cell: 2,
            showing: false,
            color: '',
          },
          {
            cell: 6,
            message: {} as SlackMessage,
            showing: true,
            color: '',
          },
        ],
      },
      horizonConveyor: {
        slideMessages: [],
      },
      requestInfo: {} as any,
      members: [],
    } as any,
  };

  test(
    '1. payloadのセル番号に対応したセルの表示状態を確認し、非表示であればキューから取得してメッセージをセットする' +
      '2. １つキューからメッセージを消去する',
    async () => {
      const dispatched: Action<any>[] = [];
      // テストライブラリを使用しないredux-sagaのtest
      await runSaga(
        {
          dispatch: (action: Action<any>) => dispatched.push(action),
          getState: () => mockState,
        },
        getGridMessagesFromQueFlow as any,
        getGridMessagesFromQue(2)
      ).toPromise();
      const expectedGridPayload: GridMessages = [
        {
          cell: 2,
          message: mockMessages[0],
          showing: true,
          color: colorPattern[0], // 循環カラーの1回目
        },
      ];
      const expectedActions = [
        setGridMessages(expectedGridPayload),
        dequeueMessageQueue(1),
      ];
      assert.deepEqual(dispatched, expectedActions);
    }
  );

  test('表示中のセル番号が指定された場合、何もアクションがdispatchされない', async () => {
    const dispatched: Action<any>[] = [];
    await runSaga(
      {
        dispatch: (action: Action<any>) => dispatched.push(action),
        getState: () => mockState,
      },
      getGridMessagesFromQueFlow as any,
      getGridMessagesFromQue(6)
    ).toPromise();

    assert.deepEqual(dispatched, []);
  });

  test('有効設定のセル以外の番号が指定された場合、何もアクションがdispatchされない', async () => {
    const dispatched: Action<any>[] = [];
    await runSaga(
      {
        dispatch: (action: Action<any>) => dispatched.push(action),
        getState: () => mockState,
      },
      getGridMessagesFromQueFlow as any,
      getGridMessagesFromQue(1)
    ).toPromise();

    assert.deepEqual(dispatched, []);
  });
});
