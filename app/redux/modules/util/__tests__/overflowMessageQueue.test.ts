import { select, put } from 'redux-saga/effects';
import assert from 'power-assert';
import {
  overflowMessageQueue,
  modeSelector,
  conveyorSettingSelector,
  messageQueueLengthSelector,
  gridSettingSelector,
} from '../overflowMessageQueue';
import { dequeueMessageQueue } from '../../app/messageQueue';
import { HorizonConveyor, Grid } from '../../types';
import appConst from '../../../../modules/constants/appConst';

describe('メッセージキュー上限管理フロー overflowMessageQueueのテスト', () => {
  test('モードがconveyorでoverflow: trueの時、conveyorキュー上限以上のメッセージをデキューするアクションがdispatchされる', () => {
    const mockHorizonConveyor: HorizonConveyor = {
      amount: 2,
      queueLimit: 2,
      overflow: true,
    };
    const messageQueueLength = 3;
    const gen = overflowMessageQueue();
    assert.deepEqual(gen.next().value, select(modeSelector));
    assert.deepEqual(
      gen.next(appConst.SCREEN_MODE_CONVEYOR as any).value,
      select(conveyorSettingSelector)
    );
    assert.deepEqual(
      gen.next(mockHorizonConveyor as any).value,
      select(messageQueueLengthSelector)
    );
    assert.deepEqual(
      gen.next(messageQueueLength as any).value,
      put(dequeueMessageQueue(1))
    );
    assert.ok(gen.next().done);
  });

  test('モードがconveyorでoverflow: trueの時、conveyorキュー上限にメッセージ数が収まっていればdequeueはされない', () => {
    const mockHorizonConveyor: HorizonConveyor = {
      amount: 2,
      queueLimit: 3,
      overflow: true,
    };
    const messageQueueLength = 3;
    const gen = overflowMessageQueue();
    assert.deepEqual(gen.next().value, select(modeSelector));
    assert.deepEqual(
      gen.next(appConst.SCREEN_MODE_CONVEYOR as any).value,
      select(conveyorSettingSelector)
    );
    assert.deepEqual(
      gen.next(mockHorizonConveyor as any).value,
      select(messageQueueLengthSelector)
    );
    // dequeueなしでdoneになる
    assert.ok(gen.next(messageQueueLength as any).done);
  });

  test('モードがconveyorでoverflow: falseの時、dequeueは行われない', () => {
    const mockHorizonConveyor: HorizonConveyor = {
      amount: 2,
      queueLimit: 3,
      overflow: false,
    };
    const gen = overflowMessageQueue();
    assert.deepEqual(gen.next().value, select(modeSelector));
    assert.deepEqual(
      gen.next(appConst.SCREEN_MODE_CONVEYOR as any).value,
      select(conveyorSettingSelector)
    );
    assert.ok(gen.next(mockHorizonConveyor as any).done);
  });

  test('モードがgridでoverflow: trueの時、gridキュー上限以上のメッセージをデキューするアクションがdispatchされる', () => {
    const mockGrid: Grid = {
      activeCell: [1, 2],
      queueLimit: 2,
      overflow: true,
    };
    const messageQueueLength = 3;
    const gen = overflowMessageQueue();
    assert.deepEqual(gen.next().value, select(modeSelector));
    assert.deepEqual(
      gen.next(appConst.SCREEN_MODE_GRID as any).value,
      select(gridSettingSelector)
    );
    assert.deepEqual(
      gen.next(mockGrid as any).value,
      select(messageQueueLengthSelector)
    );
    assert.deepEqual(
      gen.next(messageQueueLength as any).value,
      put(dequeueMessageQueue(1))
    );
  });

  test('モードがgridでoverflow: trueの時、gridキュー上限にメッセージ数が収まっていればdequeueは行われない', () => {
    const mockGrid: Grid = {
      activeCell: [1, 2],
      queueLimit: 3,
      overflow: true,
    };
    const messageQueueLength = 3;
    const gen = overflowMessageQueue();
    assert.deepEqual(gen.next().value, select(modeSelector));
    assert.deepEqual(
      gen.next(appConst.SCREEN_MODE_GRID as any).value,
      select(gridSettingSelector)
    );
    assert.deepEqual(
      gen.next(mockGrid as any).value,
      select(messageQueueLengthSelector)
    );
    assert.ok(gen.next(messageQueueLength as any).done);
  });

  test('モードがgridでoverflow: falseの時、gridキュー上限に関係なくdequeueは行われない', () => {
    const mockGrid: Grid = {
      activeCell: [1, 2],
      queueLimit: 2,
      overflow: false,
    };
    const gen = overflowMessageQueue();
    assert.deepEqual(gen.next().value, select(modeSelector));
    assert.deepEqual(
      gen.next(appConst.SCREEN_MODE_GRID as any).value,
      select(gridSettingSelector)
    );
    assert.ok(gen.next(mockGrid as any).done);
  });
});
