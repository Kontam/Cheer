import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { reducer as formReducer } from 'redux-form';
import authInfo from './user/authInfo';
import slackMessages from './api/slackMessages';
import slackChannelInfo from './api/slackChannelInfo';
import slackChannelList from './api/slackChannelList';
import appUserInfo from './api/appUserInfo';
import selectChannelUI from './ui/selectChannelUI';
import screenMenuUI from './ui/screenMenuUI';
import channelHistories from './app/channelHistories';
import searchedChannels from './app/searchedChannels';
import messageQueue from './app/messageQueue';
import requestInfo from './app/requestInfo';
import gridMessages from './app/gridMessages';
import grid from './settings/screen/grid';
import horizonConveyor from './settings/screen/horizonConveyor';
import mode from './settings/mode';
import slideMessages from './app/slideMessages';
import members from './app/members';
import alert from './common/alert';
import systemMessage from './common/systemMessage';
import slackEmojiList from './api/slackEmojiList';

// 設定画面と共有になる部分
export const settingsReducers = combineReducers({
  mode,
  screen: combineReducers({
    grid,
    horizonConveyor,
  }),
});

export default function createRootReducer(history: History) {
  return combineReducers({
    user: combineReducers({
      authInfo,
    }),
    api: combineReducers({
      slackMessages,
      slackEmojiList,
      slackChannelInfo,
      slackChannelList,
      appUserInfo,
    }),
    ui: combineReducers({
      selectChannelUI,
      screenMenuUI,
    }),
    app: combineReducers({
      searchedChannels,
      channelHistories,
      messageQueue,
      members,
      requestInfo,
      grid: combineReducers({
        gridMessages,
      }),
      horizonConveyor: combineReducers({
        slideMessages,
      }),
    }),
    common: combineReducers({
      alert,
      systemMessage,
    }),
    settings: settingsReducers,
    router: connectRouter(history),
    form: formReducer,
  });
}
