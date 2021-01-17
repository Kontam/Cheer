import { Store } from 'redux';
import { ipcRenderer } from 'electron';
import appConst from '../constants/appConst';
import { pushSelectChannel } from '../../redux/modules/api/slackChannelList';

export const setChannelSelectHandler = (store: Store) => {
  ipcRenderer.on(appConst.IPC_SELECT_CHANNEL, () => {
    store.dispatch(pushSelectChannel());
  });
};
