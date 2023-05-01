import { ipcMain } from 'electron';
import appConst from '../../constants/appConst';
import { getWebClientInstance } from '../../util/requests/webClient';

export function setSlackEventHandlers() {
  ipcMain.handle(appConst.IPC_SLACK_EMOJI_LIST, (e, arg) => {
    const webClient = getWebClientInstance(arg.token);
    return webClient.emoji.list();
  });
  ipcMain.handle(appConst.IPC_SLACK_CHANNEL_LIST, (e, arg) => {
    const webClient = getWebClientInstance(arg.token);
    return webClient.conversations.list(arg.option);
  });
  ipcMain.handle(appConst.IPC_SLACK_USER_PROFILE, (e, arg) => {
    const webClient = getWebClientInstance(arg.token);
    return webClient.users.profile.get();
  });
}
