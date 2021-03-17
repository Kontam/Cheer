/*
 * File for secret variables
 * Empty values are prepared for CI
 * Don't commit actual values!!!
 */
export const secret = {
  SLACK_CLIENT_ID: '892781787364.1096785634597',
  SLACK_REDIRECT_URL: 'https://cheer.konkonta.com/complete', // packageにnode_envが渡せないしdevではurl schemeがテストできない
  // SLACK_REDIRECT_URL: 'http://localhost:3000/complete', // devで試験するときはlocalhostにする
  DEV_SCHEME_URL:
    'cheer-kontam://user=xoxp-892781787364-881771540707-1849717804582-f50bce0e8498700321f720534d2498a6&bot=xoxb-892781787364-1196074122145-kn5jY8GC7QhoUcZT9RLrlAPj', // valid
  //  'cheer-kontam://user=xoxp-8927817873xx-1079981198772-1273486752001-14b698418fff226196d31ef3f538d7c0&bot=1234', // invalid

  // electron-storeの中で比較的secretなもの
  STORAGE_AUTH_TOKEN: 'secret-cheer-token',
  STORAGE_AUTH_BOT_TOKEN: 'secret-cheer-bot-token',
} as const;
