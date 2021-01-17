import { createAction, handleActions, Action } from 'redux-actions';
import { put, select, takeEvery } from 'redux-saga/effects';
import {
  SelectChannelUI,
  RootState,
  SlackChannelList,
  SelectChannelTab,
} from '../types';
import { searchChannelByString } from '../../../modules/util/stringSearch';
import { searchChannelSuccess } from '../app/searchedChannels';

const INITIAL_STATE: SelectChannelUI = {
  searchString: '',
  selectedTab: 'all',
  selectedChannel: '',
};

// reducer
const SELECT_CHANNEL = 'SELECT_CHANNEL';
const SELECT_TAB = 'SELECT_TAB';
const CHANGE_SEARCH_STRING = 'CHANGE_SEARCH_STRING';

// saga
const SEARCH_CHANNEL = 'SEARCH_CHANNEL';

// reducer
export const selectChannel = createAction<string>(SELECT_CHANNEL);
export const selectTab = createAction<SelectChannelTab>(SELECT_TAB);
export const changeSearchString = createAction<string>(CHANGE_SEARCH_STRING);

// saga
export const searchChannel = createAction<string>(SEARCH_CHANNEL);

export const channelListSelector = (state: RootState) =>
  state.api.slackChannelList;

/**
 * チャンネル検索フロー
 * apiから取得済みのチャンネルから検索一致するチャンネルを抽出する
 */
export function* searchChannelFlow({ payload }: Action<string>) {
  const channelList: SlackChannelList = yield select(channelListSelector);
  yield put(changeSearchString(payload));
  const searchResult = searchChannelByString(payload, channelList.channels);
  yield put(searchChannelSuccess(searchResult));
}

export const selectChannelUISagas = [
  takeEvery(SEARCH_CHANNEL, searchChannelFlow),
];

export default handleActions(
  {
    [SELECT_CHANNEL]: (state, { payload }: Action<string>) => ({
      ...state,
      selectedChannel: payload,
    }),

    [SELECT_TAB]: (state, { payload }: Action<SelectChannelTab>) => ({
      ...state,
      selectedTab: payload,
    }),

    [CHANGE_SEARCH_STRING]: (state, { payload }: Action<string>) => ({
      ...state,
      searchString: payload,
    }),
  },
  INITIAL_STATE
);
