/*
 * File for secret variables
 * Empty values are prepared for CI
 * Don't commit actual values!!!
 */
export const secret = {
  SLACK_CLIENT_ID: '',
  SLACK_REDIRECT_URL: '',
  DEV_SCHEME_URL: '',

  // electron-storeの中で比較的secretなもの
  STORAGE_AUTH_TOKEN: '',
  STORAGE_AUTH_BOT_TOKEN: '',
} as const;
