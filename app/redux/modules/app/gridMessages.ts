import { createAction, handleActions, Action } from 'redux-actions';
import { select, put, takeEvery } from 'redux-saga/effects';
import { dequeueMessageQueue, WATCH_NEW_CHANNEL } from './messageQueue';
import { GridMessages, GridMessage, RootState, MessageQueue } from '../types';
import { getColorRotatoly } from '../../../modules/util/getRandomColor';

export const INITIAL_STATE: GridMessages = [];

// Saga Action
export const GET_GRID_MESSAGES_FROM_QUE = 'GET_GRID_MESSAGES_FROM_QUE';

// Action
export const INITIALIZE_GRID_MESSAGES = 'INITIALIZE_GRID_MESSAGES';
export const SET_GRID_MESSAGES = 'SET_GRID_MESSAGES';
export const HIDE_GRID_MESSAGES = 'HIDE_GRID_MESSAGES';

// Saga Action Creator
export const getGridMessagesFromQue = createAction<number>(
  GET_GRID_MESSAGES_FROM_QUE
);

// Action Creator
export const initializeGridMessages = createAction<number[]>(
  INITIALIZE_GRID_MESSAGES
);
export const setGridMessages = createAction<GridMessages>(SET_GRID_MESSAGES);
export const hideGridMessages = createAction<number[]>(HIDE_GRID_MESSAGES);

/**
 * グリッドの空き状況を計算し、キュー、空き状況に応じた個数をキューから取り出す
 * グリッドは初期化されている前提で考える（有効で設定したセル全てにデータが入っている)
 * @param {Action<object>} デキューする最大個数、挿入するセル
 */
export function* getGridMessagesFromQueFlow({ payload }: Action<number>) {
  const messageQueue: MessageQueue = yield select(
    (state: RootState) => state.app.messageQueue
  );
  const gridMessages: GridMessages = yield select(
    (state: RootState) => state.app.grid.gridMessages
  );
  // 表示中フラグ=falseは未使用セル
  // 指定セルが利用不可であれば処理しない
  if (gridMessages.some((gm) => !gm.showing && gm.cell === payload)) {
    // 利用可能セルにメッセージを入れる（ランダム等に変更するならここを修正する）
    const dequeuedMessages = messageQueue.slice(0, 1);
    const newGredMessages = dequeuedMessages.map(
      (message): GridMessage => ({
        cell: payload,
        message,
        showing: true,
        color: getColorRotatoly(),
      })
    );
    yield put(setGridMessages(newGredMessages));
    yield put(dequeueMessageQueue(1));
  }
}

export const gridMessagesSagas = [
  takeEvery(GET_GRID_MESSAGES_FROM_QUE, getGridMessagesFromQueFlow),
];

export default handleActions<GridMessages, any>(
  {
    [INITIALIZE_GRID_MESSAGES]: (state, { payload }: Action<number[]>) =>
      payload.map(
        (cellNum: number): GridMessage => ({
          cell: cellNum,
          showing: false,
          color: '',
        })
      ),
    [SET_GRID_MESSAGES]: (
      state: GridMessages,
      { payload }: Action<GridMessages>
    ) => {
      const newState = state.map(
        (message) =>
          payload.find((newMessage) => newMessage.cell === message.cell) ||
          message
      );

      return newState;
    },
    [HIDE_GRID_MESSAGES]: (state, { payload }: Action<number[]>) =>
      state.map((message) =>
        payload.some((cellNum) => message.cell === cellNum)
          ? {
              ...message,
              showing: false,
            }
          : message
      ),
    [WATCH_NEW_CHANNEL]: () => [],
  },
  INITIAL_STATE
);
