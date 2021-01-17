import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import { SlackAuthInfo } from '../../types';
import appConst from '../../../modules/constants/appConst';
import { openDefaultBrowser } from '../../../redux/middlewares/desktopIntegrationMiddleware';
import {
  getBotTokenFromURL,
  getTokenFromURL,
} from '../../../modules/util/getTokenFromURL';
import { login } from '../../../redux/modules/sagas/loginSagas';
import { AuthInfo } from '../../../redux/modules/types';

const LoginFormPage: React.FC = () => {
  const dispatch = useDispatch();
  const slackAuthInfo: SlackAuthInfo = {
    clientId: appConst.SLACK_CLIENT_ID,
    scope: appConst.SLACK_SCOPE,
    botScope: appConst.SLACK_BOT_SCOPE,
    redirectUri: appConst.SLACK_REDIRECT_URL,
  };
  const authInfo: AuthInfo = useSelector((state) => state.user.authInfo);

  /**
   * prodではブラウザを開いてSlack認証を開始する
   * devではブラウザからスキームurlが受け取れないのでプロセスを省略する
   */
  const handleStartAuth = (url: string) => {
    if (process.env.NODE_ENV === 'development' || process.env.E2E_BUILD) {
      const token = getTokenFromURL(appConst.DEV_SCHEME_URL);
      const botToken = getBotTokenFromURL(appConst.DEV_SCHEME_URL);
      if (!token || !botToken) {
        throw new Error('invalid dev token');
      }
      dispatch(login({ token, botToken }));
      return;
    }
    dispatch(openDefaultBrowser(url));
  };

  return (
    <LoginForm
      slackAuthInfo={slackAuthInfo}
      handleStartAuth={handleStartAuth}
      authInfo={authInfo}
    />
  );
};

export default LoginFormPage;
