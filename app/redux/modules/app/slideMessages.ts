import { createAction, handleActions, Action } from 'redux-actions';
import { select, takeEvery, put } from 'redux-saga/effects';
import { UserMessage } from '../../../modules/util/requests/webClient';
import { SlideMessages, MessageQueue, RootState } from '../types';
import { dequeueMessageQueue, WATCH_NEW_CHANNEL } from './messageQueue';
import { getColorRotatoly } from '../../../modules/util/getRandomColor';

// SlideMessageは今後アイコンや名前などを持つ可能性があるのでオブジェクトでラップする
export const INITIAL_STATE: SlideMessages = [];

// saga actions
export const GET_SLIDE_MESSAGES_FROM_QUE = 'GET_SLIDE_MESSAGES_FROM_QUE';
export const CREATE_AND_ENQUEUE_SLIDE_MESSAGES =
  'CREATE_AND_ENQUEUE_SLIDE_MESSAGES';

// actions
export const ENQUEUE_SLIDE_MESSAGES = 'ENQUEUE_SLIDE_MESSAGES';
export const DEQUEUE_SLIDE_MESSAGES = 'DEQUEUE_SLIDE_MESSAGES';

// saga action creators
export const getSlideMessagesFromQue = createAction<number>(
  GET_SLIDE_MESSAGES_FROM_QUE
);
export const createAndEnqueueSlideMessages = createAction<UserMessage[]>(
  CREATE_AND_ENQUEUE_SLIDE_MESSAGES
);

// action creators
export const enqueueSlideMessages = createAction<SlideMessages>(
  ENQUEUE_SLIDE_MESSAGES
);
export const dequeueSlideMessages = createAction<number>(
  DEQUEUE_SLIDE_MESSAGES
);

// selectors
export const messageQueueSelector = (state: RootState) =>
  state.app.messageQueue;
export const amountHorizonConveyorSelector = (state: RootState) =>
  state.settings.screen.horizonConveyor.amount;
export const slideMessagesSelector = (state: RootState) =>
  state.app.horizonConveyor.slideMessages;

// saga flows
// UserMessageに必要な情報を追加してSlideMessageオブジェクトに変換してエンキューする
// takeEveryの形式だが現状他のFlowからのみ呼ばれており、takeEveryはしていない
export function* createAndEnqueueSlideMessagesFlow({
  payload,
}: Action<UserMessage[]>) {
  const slideMessages: SlideMessages = payload.map((message) => ({
    message,
    // TODO: Randomがテスタビリティ低く扱いづらいので色を順番ローテーションにしたい
    color: getColorRotatoly(),
  }));
  yield put(enqueueSlideMessages(slideMessages));
}

// 水平コンベヤのキューからメッセージを取得する処理
export function* getSlideMessagesFromQueFlow({ payload }: Action<number>) {
  if (payload < 1) return;
  const messageQueue: MessageQueue = yield select(messageQueueSelector);
  const amountHorizonConveyor: number = yield select(
    amountHorizonConveyorSelector
  );
  yield* createAndEnqueueSlideMessagesFlow(
    createAndEnqueueSlideMessages(messageQueue.slice(0, payload))
  );
  yield put(dequeueMessageQueue(payload));
  const slideMessages: SlideMessages = yield select(slideMessagesSelector);
  const conveyorLength = amountHorizonConveyor + 1; // 非表示枠１を追加
  if (slideMessages.length > conveyorLength) {
    // 最大表示数を溢れた分のメッセージを消去
    yield put(dequeueSlideMessages(slideMessages.length - conveyorLength));
  }
}

// saga
export const slideMessagesSagas = [
  takeEvery(GET_SLIDE_MESSAGES_FROM_QUE, getSlideMessagesFromQueFlow),
];

// reducer
export default handleActions<SlideMessages, any>(
  {
    [ENQUEUE_SLIDE_MESSAGES]: (state, { payload }: Action<SlideMessages>) => [
      ...state,
      ...payload,
    ],
    [DEQUEUE_SLIDE_MESSAGES]: (state, { payload }: Action<number>) =>
      state.slice(payload),
    [WATCH_NEW_CHANNEL]: () => [],
  },
  INITIAL_STATE
);
