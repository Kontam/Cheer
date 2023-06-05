import { Store } from 'redux';
import appConst from '../constants/appConst';
import { pushSelectChannel } from '../../redux/modules/api/slackChannelList';
import { ipcRenderer } from '../util/exposedElectron';

export const setChannelSelectHandler = (store: Store) => {
  ipcRenderer.on(appConst.IPC_SELECT_CHANNEL, () => {
    store.dispatch(pushSelectChannel());
  });
};
