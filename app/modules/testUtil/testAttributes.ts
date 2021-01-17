export const QA_ATTRIBUTE_NAME = 'data-qa' as const;

export const QA_ATTRIBUTES: any = {
  LOGIN: { [QA_ATTRIBUTE_NAME]: 'Login' },
  SLACK_AUTH_BUTTON: { [QA_ATTRIBUTE_NAME]: 'SlackAuthButton' },
};

export function createQAAttributeSelector(key: string) {
  return `[${QA_ATTRIBUTE_NAME}=${QA_ATTRIBUTES[key][QA_ATTRIBUTE_NAME]}]` as string;
}
