import appConst from '../constants/appConst';

export function getTokenFromURL(url: string) {
  const regexString = `${appConst.URL_SCHEME}://.*user=(.*?)(&bot=.*?|/?$)`;
  const regex = RegExp(regexString);
  const result = url.match(regex);
  return result && result.length > 0 ? result[1] : null;
}

export function getBotTokenFromURL(url: string) {
  const regexString = `${appConst.URL_SCHEME}://.*?bot=(.*?)/?$`;
  const regex = RegExp(regexString);
  const result = url.match(regex);
  return result && result.length > 0 ? result[1] : null;
}
