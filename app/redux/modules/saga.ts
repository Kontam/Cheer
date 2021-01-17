import { all } from 'redux-saga/effects';
import { gridMessagesSagas } from './app/gridMessages';
import { slideMessagesSagas } from './app/slideMessages';
import { configSagas } from '../effects/config';
import { startWatchSagas } from './sagas/startWatchSagas';
import { authSagas } from './user/authInfo';
import { channelListSagas } from './api/slackChannelList';
import { windowSagas } from '../effects/window';
import { selectChannelUISagas } from './ui/selectChannelUI';
import { channelHistoriesSagas } from './sagas/channelHistories';
import { loginSagas } from './sagas/loginSagas';
import { authStorageSagas } from './sagas/authStorageSagas';
import { requestSlackMessagesSagas } from './sagas/requestSlackMessagesSagas';

function* rootSaga() {
  yield all([
    ...channelListSagas,
    ...startWatchSagas,
    ...gridMessagesSagas,
    ...slideMessagesSagas,
    ...configSagas,
    ...authSagas,
    ...channelHistoriesSagas,
    ...windowSagas,
    ...selectChannelUISagas,
    ...loginSagas,
    ...authStorageSagas,
    ...requestSlackMessagesSagas,
  ]);
}

export default rootSaga;
