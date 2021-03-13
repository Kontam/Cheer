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
    'cheer-kontam://user=xoxp-892781787364-881771540707-1583427858689-a1083f13b38ca0522872eae6d8d4b76e&bot=xoxb-892781787364-1196074122145-vlnCETlEdzRrkk55zGrgJKOM', // valid
  //  'cheer-kontam://user=xoxp-8927817873xx-1079981198772-1273486752001-14b698418fff226196d31ef3f538d7c0&bot=1234', // invalid

  // electron-storeの中で比較的secretなもの
  STORAGE_AUTH_TOKEN: 'secret-cheer-token',
  STORAGE_AUTH_BOT_TOKEN: 'secret-cheer-bot-token',
} as const;
