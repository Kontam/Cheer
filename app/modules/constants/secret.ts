/* 
 * File for secret variables
 * Empty values are prepared for CI
 */
export const secret = {
  SLACK_CLIENT_ID: '',
  SLACK_REDIRECT_URL: '',

  DEV_SCHEME_URL: '' // dev build cannot get tokens from browser,

  STORAGE_AUTH_TOKEN: '',
  STORAGE_AUTH_BOT_TOKEN: '',
} as const;
