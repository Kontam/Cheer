import { Store } from 'redux';
import { logout } from '../../redux/modules/sagas/loginSagas';
import appConst from '../constants/appConst';
import { ipcRenderer } from '../util/exposedElectron';

/**
 * menuからlogoutが押された時の処理
 * */
export function setLogoutEventHandler(store: Store) {
  ipcRenderer.on(appConst.IPC_LOGOUT, () => {
    store.dispatch(logout());
  });
}
