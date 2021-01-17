import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import App from './components/pages/App';
import { configureStore, history } from './redux/store/configureStore';
import { readSettingConfig } from './redux/effects/config';
import { readChannelHistoriesFromStorage } from './redux/modules/app/channelHistories';
import { setSettingEventHandler } from './redux/modules/settings/setting';
import { setChannelSelectHandler } from './modules/eventHandlers/channelSelectHandler';
import { setUrlSchemeEventHandler } from './modules/eventHandlers/urlSchemeEventHandler';
import { setLogoutEventHandler } from './modules/eventHandlers/logoutEventHandler';
import { loginWithStorage } from './redux/modules/sagas/loginSagas';

const store = configureStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

/*
 * Event Handlerの登録
 */
setSettingEventHandler(store);
setUrlSchemeEventHandler(store);
setLogoutEventHandler(store);
setChannelSelectHandler(store);

/*
 * 初期情報をstoreにロード
 * E2Eでは初期状態からの操作のみ検証するためスキップ
 */
if (!process.env.E2E_BUILD) {
  // 認証情報をstorageからロード
  store.dispatch(loginWithStorage());
  // configをstorageからロード
  store.dispatch(readSettingConfig());
  // channelInfoをstorageからロード
  store.dispatch(readChannelHistoriesFromStorage());
}

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <App store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
);
