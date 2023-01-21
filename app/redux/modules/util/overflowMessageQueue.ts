import { select, put, SelectEffect, PutEffect } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { RootState, ScreenModes, ScreenSetting } from '../types';
import appConst from '../../../modules/constants/appConst';
import { dequeueMessageQueue } from '../app/messageQueue';

export const modeSelector = (state: RootState) => state.settings.mode.screen;
export const conveyorSettingSelector = (state: RootState) =>
  state.settings.screen.horizonConveyor;
export const gridSettingSelector = (state: RootState) =>
  state.settings.screen.grid;
export const messageQueueLengthSelector = (state: RootState) =>
  state.app.messageQueue.length;

// MessageQueueの最大値を管理する
export function* overflowMessageQueue(): Generator<
  SelectEffect | PutEffect<Action<number>>,
  void,
  any
> {
  const mode: ScreenModes = yield select(modeSelector);
  let setting: ScreenSetting;
  switch (mode) {
    case appConst.SCREEN_MODE_CONVEYOR:
      setting = yield select(conveyorSettingSelector);
      break;
    case appConst.SCREEN_MODE_GRID:
      setting = yield select(gridSettingSelector);
      break;
    default:
      setting = {
        overflow: false,
        queueLimit: 0,
      };
  }
  if (setting.overflow) {
    const length: number = yield select(messageQueueLengthSelector);
    if (length > setting.queueLimit)
      yield put(dequeueMessageQueue(length - setting.queueLimit));
  }
}
