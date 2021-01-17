import { expectSaga } from 'redux-saga-test-plan';
import { takeEvery, all } from 'redux-saga/effects';
import {
  getSlideMessagesFromQue,
  slideMessagesSagas,
  messageQueueSelector,
  dequeueSlideMessages,
  amountHorizonConveyorSelector,
  slideMessagesSelector,
  createAndEnqueueSlideMessages,
  ENQUEUE_SLIDE_MESSAGES,
  CREATE_AND_ENQUEUE_SLIDE_MESSAGES,
  createAndEnqueueSlideMessagesFlow,
} from '../../slideMessages';
import { dequeueMessageQueue, enqueueMessageQueue } from '../../messageQueue';
import { UserMessage } from '../../../../../modules/util/requests/webClient';
import createRootReducer from '../../../reducer';
import { HorizonConveyor } from '../../../types';
import { setHorizonConveyor } from '../../../settings/screen/horizonConveyor';

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

  function* saga() {
    yield all(slideMessagesSagas);
  }

  test(
    '1. storeからメッセージキューの情報を取得' +
      '2. storeからHorizonConveyorの設定項目を取得' +
      '3. payloadの数だけメッセージキューの先頭からmessageを取り出し、slideMessagesをエンキューする' +
      '4. メッセージキューからpayloadの数だけメッセージをデキューする' +
      '5. 水平コンベヤ設定の表示数を取得する' +
      '6. 水平コンベヤ設定の表示数を超えている分をslideMessagesからデキューする',
    async () => {
      const payload = 3;
      const horizonConbeyorSetting: HorizonConveyor = {
        amount: 1,
        overflow: false,
        queueLimit: 10,
      };
      return expectSaga(saga)
        .withReducer(createRootReducer({} as any))
        .select(messageQueueSelector)
        .select(amountHorizonConveyorSelector)
        .put.like({ action: { type: ENQUEUE_SLIDE_MESSAGES } })
        .put(dequeueMessageQueue(payload))
        .select(slideMessagesSelector)
        .put(
          dequeueSlideMessages(payload - (horizonConbeyorSetting.amount + 1))
        )
        .dispatch(enqueueMessageQueue(mockMessages))
        .dispatch(setHorizonConveyor(horizonConbeyorSetting))
        .dispatch(getSlideMessagesFromQue(payload))
        .run();
    }
  );

  test('slideMessagesにエンキューした後、上限を溢れていなければslideMessageのデキューは行われない', async () => {
    const payload = 2;
    const horizonConbeyorSetting: HorizonConveyor = {
      amount: 3,
      overflow: false,
      queueLimit: 10,
    };
    return expectSaga(saga)
      .withReducer(createRootReducer({} as any))
      .select(messageQueueSelector)
      .select(amountHorizonConveyorSelector)
      .put.like({ action: { type: ENQUEUE_SLIDE_MESSAGES } }) // colorがローテーションなので部分一致
      .put(dequeueMessageQueue(payload))
      .select(slideMessagesSelector)
      .not.put(
        dequeueSlideMessages(payload - (horizonConbeyorSetting.amount + 1))
      )
      .dispatch(enqueueMessageQueue(mockMessages))
      .dispatch(setHorizonConveyor(horizonConbeyorSetting))
      .dispatch(getSlideMessagesFromQue(payload))
      .run();
  });

  test('payloadが1よりも小さい時、何もせずに終了する', async () => {
    const payload = 0;
    const horizonConbeyorSetting: HorizonConveyor = {
      amount: 1,
      overflow: false,
      queueLimit: 10,
    };
    return expectSaga(saga)
      .withReducer(createRootReducer({} as any))
      .not.select(messageQueueSelector)
      .not.select(amountHorizonConveyorSelector)
      .not.put(createAndEnqueueSlideMessages(mockMessages.slice(0, payload)))
      .not.put(dequeueMessageQueue(payload))
      .not.select(slideMessagesSelector)
      .not.put(
        dequeueSlideMessages(payload - (horizonConbeyorSetting.amount + 1))
      )
      .dispatch(enqueueMessageQueue(mockMessages))
      .dispatch(setHorizonConveyor(horizonConbeyorSetting))
      .dispatch(getSlideMessagesFromQue(payload))
      .run();
  });

  test('payloadがキューの数より大きい場合、全てをキューから取得する', async () => {
    const payload = 100;
    const horizonConbeyorSetting: HorizonConveyor = {
      amount: 1,
      overflow: false,
      queueLimit: 10,
    };
    return expectSaga(saga)
      .withReducer(createRootReducer({} as any))
      .select(messageQueueSelector)
      .select(amountHorizonConveyorSelector)
      .put.like({ action: { type: ENQUEUE_SLIDE_MESSAGES } }) // colorがランダムなので部分一致
      .put(dequeueMessageQueue(payload))
      .select(slideMessagesSelector)
      .put(
        dequeueSlideMessages(
          mockMessages.length - (horizonConbeyorSetting.amount + 1)
        )
      )
      .dispatch(enqueueMessageQueue(mockMessages))
      .dispatch(setHorizonConveyor(horizonConbeyorSetting))
      .dispatch(getSlideMessagesFromQue(payload))
      .run();
  });
});

describe('SlideMessageオブジェクトを生成してenqueueする処理のテスト', () => {
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
  function* saga() {
    yield takeEvery(
      CREATE_AND_ENQUEUE_SLIDE_MESSAGES,
      createAndEnqueueSlideMessagesFlow
    );
  }
  test('mockメッセージを入力すると加工した値でenqueueエフェクトがdispatchされる', async () => {
    return expectSaga(saga)
      .put.like({ action: { type: ENQUEUE_SLIDE_MESSAGES } })
      .dispatch(createAndEnqueueSlideMessages(mockMessages))
      .run();
  });
});
