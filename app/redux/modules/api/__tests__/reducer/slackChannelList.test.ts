import assert from 'power-assert';
import { createStore, Store } from 'redux';
import slackChannelList, {
  INITIAL_STATE,
  channelListRequestSuccess,
} from '../../slackChannelList';
import {
  SlackChannel,
  SlackChannelListResponse,
} from '../../../../../modules/util/requests/webClient';

describe('reducerのテスト', () => {
  let store: Store;
  beforeEach(() => {
    store = createStore(slackChannelList, INITIAL_STATE);
  });
  const mockResponse: SlackChannelListResponse = {
    ok: true,
    channels: [
      {
        created: 123456,
        creator: 'creator',
        id: 'id1',
        is_archived: true,
        is_channel: true,
        is_ext_shared: true,
        is_general: true,
        is_group: true,
        is_im: true,
        is_member: true,
        is_mpim: true,
        is_org_shared: true,
        is_pending_ext_shared: true,
        is_private: true,
        is_shared: true,
        name: 'channel1',
        num_members: 123,
      } as SlackChannel,
      {
        created: 123456,
        creator: 'creator',
        id: 'id2',
        is_archived: true,
        is_channel: true,
        is_ext_shared: true,
        is_general: true,
        is_group: true,
        is_im: true,
        is_member: true,
        is_mpim: true,
        is_org_shared: true,
        is_pending_ext_shared: true,
        is_private: true,
        is_shared: true,
        name: 'channel2',
        num_members: 123,
      } as SlackChannel,
    ],
  } as SlackChannelListResponse;

  test('APIのレスポンスを渡された時、id,nameに絞ってstateに格納する', () => {
    store.dispatch(channelListRequestSuccess(mockResponse.channels));
    const state = store.getState();
    const expected = {
      channels: [
        {
          id: 'id1',
          name: 'channel1',
        },
        {
          id: 'id2',
          name: 'channel2',
        },
      ],
      error: false,
      error_message: '',
      loaded: true,
      loading: false,
    };
    assert.deepStrictEqual(state, expected);
  });

  test('channel0件の時でもエラー終了しない', () => {
    store.dispatch(channelListRequestSuccess([]));
    const state = store.getState();
    assert.deepStrictEqual(state, { ...INITIAL_STATE, loaded: true });
  });
});
