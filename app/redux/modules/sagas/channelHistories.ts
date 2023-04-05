import { takeEvery, put, call } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import uniqBy from 'lodash.uniqby';
import appConst from '../../../modules/constants/appConst';
import { ChannelHistories } from '../types';
import {
  historyLoaded,
  READ_CHANNEL_HISTORIES_FROM_STORAGE,
  WRITE_CHANNEL_HISTORIES_TO_STORAGE,
} from '../app/channelHistories';
import { selectChannel, selectTab } from '../ui/selectChannelUI';
import { ipcRenderer } from '../../../modules/util/exposedElectron';

// storageから前回Watchチャンネルの情報を取得
export function* readChannelHistoriesFromStorageFlow() {
  const channelHistories: ChannelHistories = yield call(
    ipcRenderer.invoke,
    appConst.IPC_REQUEST_READ_STORE,
    { name: appConst.STORAGE_CHANNEL_HISTORIES }
  );
  if (!(channelHistories && channelHistories.length)) return;
  const uniqHistories: ChannelHistories = yield call(
    uniqBy,
    channelHistories,
    'id'
  );
  yield put(historyLoaded(uniqHistories));
  yield put(selectTab('history'));
  yield put(selectChannel(uniqHistories[uniqHistories.length - 1].id));
}

// storageにSlack情報を保存
export function* writeChannelHistoriesToStorageFlow({
  payload,
}: Action<ChannelHistories>) {
  yield ipcRenderer.send(appConst.IPC_SAVE_TO_STORE, {
    name: appConst.STORAGE_CHANNEL_HISTORIES,
    value: [...payload],
  });
}

export const channelHistoriesSagas = [
  takeEvery(
    READ_CHANNEL_HISTORIES_FROM_STORAGE,
    readChannelHistoriesFromStorageFlow
  ),
  takeEvery(
    WRITE_CHANNEL_HISTORIES_TO_STORAGE,
    writeChannelHistoriesToStorageFlow
  ),
];
