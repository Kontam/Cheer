import appConst from '../constants/appConst';

export const isUrlScheme = (str: string) => {
  const urlRegex = RegExp(`${appConst.URL_SCHEME}://`);
  return urlRegex.test(str);
};
