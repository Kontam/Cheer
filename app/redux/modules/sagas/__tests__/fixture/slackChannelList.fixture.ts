import {
  SlackChannel,
  SlackChannelListResponse,
} from '../../../../../modules/util/requests/webClient';

export const mockSlackChannelListResponse: SlackChannelListResponse = {
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
  ],
  response_metadata: {
    next_cursor: '',
  },
} as SlackChannelListResponse;
