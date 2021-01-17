import { WebClient } from '@slack/web-api';

export type BotProfile = {
  app_id: string;
  deleted: boolean;
  icons: any;
  id: string;
  name: string;
  team_id: string;
  updated: number;
};

export type BotSlackMessage = {
  attachments: any;
  bot_id: string;
  bot_profile: BotProfile;
  team: string;
  text: string;
  ts: string;
  type: 'message';
  user: string;
};

export type UserMessage = {
  blocks: any;
  client_msg_id: string;
  team: string;
  text: string;
  ts: string;
  type: 'message';
  user: string;
};

export type SubMessage = {
  type: string;
  subtype: string;
  ts: string;
  user: string;
  text: string;
};

export type MessageFromSlack = UserMessage | BotSlackMessage | SubMessage;
export type ChannelInfoFromSlack = {
  created: number;
  channel: {
    creator: string;
    id: string;
    is_archived: boolean;
    is_channel: true;
    is_ext_shared: boolean;
    is_general: boolean;
    is_group: boolean;
    is_im: boolean;
    is_member: true;
    is_mpim: boolean;
    is_org_shared: boolean;
    is_pending_ext_shared: boolean;
    is_private: boolean;
    is_shared: boolean;
    last_read: string;
    name: string;
    name_normalized: string;
    parent_conversation: null;
    pending_connected_team_ids: [];
    pending_shared: [];
    previous_names: [];
    purpose: {
      creator: string;
      last_set: number;
      value: string;
      shared_team_ids: [];
    };
    topic: {
      value: string;
      creator: string;
      last_set: number;
    };
  };
  ok: boolean;
  error?: string;
};

export type SlackHistoryResponse = {
  channel_actions_count: number;
  channel_actions_ts: any;
  has_more: boolean;
  messages: MessageFromSlack[];
  ok: boolean;
  pin_count: number;
  response_metadata: any;
};

export type SlackUserInfoResponse = {
  ok: boolean;
  user: {
    id: string;
    team_id: string;
    name: string;
    deleted: boolean;
    color: string;
    real_name: string;
    tz: string;
    tz_label: string;
    tz_offset: number;
    profile: {
      avatar_hash: string;
      status_text: string;
      status_emoji: string;
      real_name: string;
      display_name: string;
      real_name_normalized: string;
      display_name_normalized: string;
      email: string;
      image_original: string;
      image_24: string;
      image_32: string;
      image_48: string;
      image_72: string;
      image_192: string;
      image_512: string;
      team: string;
    };
    is_admin: boolean;
    is_owner: boolean;
    is_primary_owner: boolean;
    is_restricted: boolean;
    is_ultra_restricted: boolean;
    is_bot: boolean;
    updated: number;
    is_app_user: boolean;
    has_2fa: boolean;
  };
};

export type UserProfileGetResponse = {
  ok: boolean;
  profile: {
    title: string;
    phone: string;
    skype: string;
    real_name: string;
    real_name_normalized: string;
    display_name: string;
    display_name_normalized: string;
    fields: any[];
    status_text: string;
    status_emoji: string;
    status_expiration: number;
    avatar_hash: string;
    image_original: string;
    is_custom_image: boolean;
    email: string;
    first_name: string;
    last_name: string;
    image_24: string;
    image_32: string;
    image_48: string;
    image_72: string;
    image_192: string;
    image_512: string;
    image_1024: string;
    status_text_canonical: string;
  };
};

export type SlackChannel = {
  created: number;
  creator: string;
  id: string;
  is_archived: boolean;
  is_channel: boolean;
  is_ext_shared: boolean;
  is_general: boolean;
  is_group: boolean;
  is_im: boolean;
  is_member: boolean;
  is_mpim: boolean;
  is_org_shared: boolean;
  is_pending_ext_shared: boolean;
  is_private: boolean;
  is_shared: boolean;
  name: string;
  name_normalized: string;
  num_members: number;
  parent_conversation: any;
  pending_connected_team_ids: [];
  pending_shared: [];
  previous_names: [];
  purpose: { value: string; creator: string; last_set: number };
  shared_team_ids: [string];
  topic: { value: string; creator: string; last_set: number };
  unlinked: number;
};

export type SlackChannelListResponse = {
  channels: SlackChannel[];
  ok: boolean;
  response_metadata: {
    next_cursor: string;
  };
};

class SlackWebClient {
  instance: WebClient | null;

  botInstance: WebClient | null;

  constructor() {
    this.instance = null;
    this.botInstance = null;
  }

  getInstance(token: string) {
    if (!this.instance) {
      this.instance = new WebClient(token);
    }
    return this.instance;
  }

  getBotInstance(token: string) {
    if (!this.botInstance) {
      this.botInstance = new WebClient(token);
    }
    return this.botInstance;
  }

  removeInstance() {
    this.instance = null;
    this.botInstance = null;
  }
}
const Slack = new SlackWebClient();

export function getWebClientInstance(token: string) {
  return Slack.getInstance(token);
}

export function getWebClientBotInstance(token: string) {
  return Slack.getBotInstance(token);
}

/**
 * token情報を入れ替える際に使用する
 */
export function removeWebClientInstance() {
  return Slack.removeInstance();
}
// export default new SlackWebClient();
