import { Store } from 'redux';
import { login } from '../../redux/modules/sagas/loginSagas';
import appConst from '../constants/appConst';
import { ipcRenderer } from '../util/exposedElectron';
import { getBotTokenFromURL, getTokenFromURL } from '../util/getTokenFromURL';

/**
 * urlスキームからtokenが渡された時の処理
 * */
export function setUrlSchemeEventHandler(store: Store) {
  ipcRenderer.on(appConst.IPC_RECIEVE_TOKEN, (_, arg: string) => {
    const token = getTokenFromURL(arg);
    const botToken = getBotTokenFromURL(arg);
    if (!token || !botToken) return; // TODO 発生が考えにくいがtoken不正時の処理を作成する
    store.dispatch(login({ token, botToken }));
  });
}
