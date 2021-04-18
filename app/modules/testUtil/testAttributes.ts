import { PositionX, PositionY } from '../../components/types';

export const QA_ATTRIBUTE_NAME = 'data-qa' as const;

export const QA_ATTRIBUTES = {
  LOGIN: { [QA_ATTRIBUTE_NAME]: 'Login' },
  SLACK_AUTH_BUTTON: { [QA_ATTRIBUTE_NAME]: 'SlackAuthButton' },
  SEARCH_CHANNEL_INPUT: { [QA_ATTRIBUTE_NAME]: 'SearchChannelInput' },
  CHANNEL_LIST: { [QA_ATTRIBUTE_NAME]: 'ChannelList' },
  CHANNEL_LIST_ITEM: { [QA_ATTRIBUTE_NAME]: 'ChannelListItem' },
  WATCH_BUTTON: { [QA_ATTRIBUTE_NAME]: 'WatchButton' },
  CONVEYOR_MESSAGE: { [QA_ATTRIBUTE_NAME]: 'ConveyorMessage' },
  WATCH_SCREEN: { [QA_ATTRIBUTE_NAME]: 'WatchScreen' },
  OPEN_MENU_ICON: { [QA_ATTRIBUTE_NAME]: 'OpenMenuIcon' },
  SCREEN_MENU: { [QA_ATTRIBUTE_NAME]: 'ScreenMenu' },
  SCREEM_MENU_PREFERENCE: { [QA_ATTRIBUTE_NAME]: 'ScreenMenuPreference' },
  PREFERENCE: { [QA_ATTRIBUTE_NAME]: 'Preference' },
  SCREEN_MODE_SELECT: { [QA_ATTRIBUTE_NAME]: 'ScreenModeSelect' },
  SCREEN_AMOUNT_FIELD: { [QA_ATTRIBUTE_NAME]: 'ScreenAmountField' },
  SCREEN_SETTING_SUBMIT: { [QA_ATTRIBUTE_NAME]: 'ScreenSettingSubmit' },
  SCREEN_SETTING_SAVED: { [QA_ATTRIBUTE_NAME]: 'ScreenSettingSaved' },
  GRID_MESSAGE_TOP_LEFT: { [QA_ATTRIBUTE_NAME]: 'GridMessageTopLeft' },
  GRID_MESSAGE_TOP_CENTER: { [QA_ATTRIBUTE_NAME]: 'GridMessageTopCenter' },
  GRID_MESSAGE_TOP_RIGHT: { [QA_ATTRIBUTE_NAME]: 'GridMessageTopRight' },
  GRID_MESSAGE_CENTER_LEFT: { [QA_ATTRIBUTE_NAME]: 'GridMessageCenterLeft' },
  GRID_MESSAGE_CENTER_CENTER: {
    [QA_ATTRIBUTE_NAME]: 'GridMessageCenterCenter',
  },
  GRID_MESSAGE_CENTER_RIGHT: { [QA_ATTRIBUTE_NAME]: 'GridMessageCenterRight' },
  GRID_MESSAGE_BOTTOM_LEFT: { [QA_ATTRIBUTE_NAME]: 'GridMessageBottomLeft' },
  GRID_MESSAGE_BOTTOM_CENTER: {
    [QA_ATTRIBUTE_NAME]: 'GridMessageBottomCenter',
  },
  GRID_MESSAGE_BOTTOM_RIGHT: { [QA_ATTRIBUTE_NAME]: 'GridMessageBottomRight' },
} as const;

export function createQAAttributeSelector(key: keyof typeof QA_ATTRIBUTES) {
  return `[${QA_ATTRIBUTE_NAME}=${QA_ATTRIBUTES[key][QA_ATTRIBUTE_NAME]}]` as string;
}

export function getQAAttributeByPosition(x: PositionX, y: PositionY) {
  const prefix = 'GRID_MESSAGE';
  let body = '';
  switch (y) {
    case 'top':
      body = `${body}_TOP`;
      break;
    case 'center':
      body = `${body}_CENTER`;
      break;
    case 'bottom':
      body = `${body}_BOTTOM`;
      break;
    default:
      body = `${body}_BOTTOM`;
  }
  switch (x) {
    case 'left':
      body = `${body}_LEFT`;
      break;
    case 'center':
      body = `${body}_CENTER`;
      break;
    case 'right':
      body = `${body}_RIGHT`;
      break;
    default:
      body = `${body}_RIGHT`;
      break;
  }
  const key = `${prefix}${body}` as keyof typeof QA_ATTRIBUTES;
  return QA_ATTRIBUTES[key];
}
