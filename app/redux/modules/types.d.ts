import { UserMessage } from '../../modules/util/requests/webClient';
import appConst from '../../modules/constants/appConst';

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}

export type ScreenModes =
  | typeof appConst.SCREEN_MODE_GRID
  | typeof appConst.SCREEN_MODE_CONVEYOR;

// settings
export type Mode = {
  screen: ScreenModes;
};

// 各screen mode共通の設定内容
export type CommonScreenMode = {
  overflow: boolean;
  queueLimit: number;
};

export type Grid = {
  activeCell: number[];
} & CommonScreenMode;

export type HorizonConveyor = {
  amount: number;
} & CommonScreenMode;

export type ScreenSetting = Grid | HorizonConveyor | CommonScreenMode;

export type FormActiveCell = number[];

// apis
export type APIState = {
  error: boolean;
  error_message: string;
  loading: boolean;
  loaded: boolean;
};
export type SlackMessage = UserMessage;

export type SlackMessages = {
  messages: SlackMessage[];
} & APIState;

export type SlackChannelInfo = {
  id: string;
  name: string;
} & APIState;

export type SlackChannelState = {
  id: string;
  name: string;
};

export type SlackChannelList = {
  channels: SlackChannelState[];
} & APIState;

export type AppUserInfo = {
  avatorHash: string;
  realName: string;
  realNameNormalized: string;
  displayName: string;
  displayNameNormalized: string;
  error: boolean;
  error_message: string;
  loading: boolean;
  loaded: boolean;
};

export type RequestInfo = {
  lastRequestTime: string;
};

// ui
export type SelectChannelTab = 'all' | 'history';
export type SelectChannelUI = {
  searchString: string;
  selectedTab: SelectChannelTab;
  selectedChannel: string;
};
export type ScreenMenuUI = {
  isOpen: boolean;
};

// app
export type SearchedChannels = SlackChannelState[];

export type ChannelHistories = SlackChannelState[];

export type Member = {
  id: string;
  name: string;
  real_name: string;
  iconUrl: string;
};
export type Members = Member[];

export type MessageQueue = UserMessage[];

export type GridMessage = {
  cell: number;
  message?: SlackMessage;
  showing: boolean;
  color: string;
};
export type GridMessages = GridMessage[];

export type SlideMessage = {
  message: SlackMessage;
  color: string;
};

export type SlideMessages = SlideMessage[];

// common
export type Alert = {
  message: string;
  showing: boolean;
};

export type SystemMessage = {
  message: string;
  showing: boolean;
};

export type TokenInfo = {
  token: string;
  botToken: string;
};

export type AuthInfo = {
  authed: boolean;
  isInvalid: boolean;
  errorMessage: string;
  loading: boolean;
} & TokenInfo;

// root states
export type SettingsState = {
  mode: Mode;
  screen: {
    grid: Grid;
    horizonConveyor: HorizonConveyor;
  };
};

export type RootState = {
  user: {
    authInfo: AuthInfo;
  };
  api: {
    slackMessages: SlackMessages;
    slackChannelInfo: SlackChannelInfo;
    slackChannelList: SlackChannelList;
    appUserInfo: AppUserInfo;
  };
  ui: {
    selectChannelUI: SelectChannelUI;
    screenMenuUI: ScreenMenuUI;
  };
  app: {
    channelHistories: ChannelHistories;
    members: Members;
    messageQueue: MessageQueue;
    requestInfo: RequestInfo;
    grid: {
      gridMessages: GridMessages;
    };
    horizonConveyor: {
      slideMessages: SlideMessages;
    };
    searchedChannels: SearchedChannels;
  };
  common: {
    alert: Alert;
    systemMessage: SystemMessage;
  };
  settings: SettingsState;
  history: any;
  form: any;
};

export type PreferenceState = {
  settings: SettingsState;
  form: any;
  pages: {
    formActiveCell: FormActiveCell;
  };
  common: {
    alert: Alert;
    systemMessage: SystemMessage;
  };
};
