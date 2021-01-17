import { createAction, handleActions, Action } from 'redux-actions';
import { UserMessage } from '../../../modules/util/requests/webClient';
import { MessageQueue } from '../types';

export const INITIAL_STATE: MessageQueue = [];

// reducer
export const ENQUEUE_MESSAGES = 'ENQUEUE_MESSAGES';
export const DEQUEUE_MESSAGES = 'DEQUEUE_MESSAGES';
export const WATCH_NEW_CHANNEL = 'WATCH_NEW_CHANNEL';

export const enqueueMessageQueue = createAction<UserMessage[]>(
  ENQUEUE_MESSAGES
);
export const dequeueMessageQueue = createAction<number>(DEQUEUE_MESSAGES);
export const watchNewChannel = createAction(WATCH_NEW_CHANNEL);

export default handleActions<MessageQueue, any>(
  {
    [ENQUEUE_MESSAGES]: (state, { payload }: Action<MessageQueue>) => [
      ...state,
      ...payload,
    ],
    [DEQUEUE_MESSAGES]: (state, { payload }: Action<number>) =>
      state.slice(payload),

    [WATCH_NEW_CHANNEL]: () => [],
  },
  INITIAL_STATE
);
