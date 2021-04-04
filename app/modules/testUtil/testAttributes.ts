export const QA_ATTRIBUTE_NAME = 'data-qa' as const;

export const QA_ATTRIBUTES = {
  LOGIN: { [QA_ATTRIBUTE_NAME]: 'Login' },
  SLACK_AUTH_BUTTON: { [QA_ATTRIBUTE_NAME]: 'SlackAuthButton' },
  SEARCH_CHANNEL_INPUT: { [QA_ATTRIBUTE_NAME]: 'SearchChannelInput' },
  CHANNEL_LIST_ITEM: { [QA_ATTRIBUTE_NAME]: 'ChannelListItem' },
  WATCH_BUTTON: { [QA_ATTRIBUTE_NAME]: 'WatchButton' },
  CONVEYOR_MESSAGE: { [QA_ATTRIBUTE_NAME]: 'ConveyorMessage' },
  WATCH_SCREEN: { [QA_ATTRIBUTE_NAME]: 'WatchScreen' },
} as const;

export function createQAAttributeSelector(key: keyof typeof QA_ATTRIBUTES) {
  return `[${QA_ATTRIBUTE_NAME}=${QA_ATTRIBUTES[key][QA_ATTRIBUTE_NAME]}]` as string;
}
