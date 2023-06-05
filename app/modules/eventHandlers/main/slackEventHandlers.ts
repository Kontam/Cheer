import { ipcMain } from 'electron';
import appConst from '../../constants/appConst';
import {
  getWebClientBotInstance,
  getWebClientInstance,
} from '../../util/requests/webClient';

export function setSlackEventHandlers() {
  ipcMain.handle(appConst.IPC_SLACK_EMOJI_LIST, (e, arg) => {
    const webClient = getWebClientInstance(arg.token);
    return webClient.emoji.list();
  });
  ipcMain.handle(appConst.IPC_SLACK_CHANNEL_LIST, (e, arg) => {
    const webClient = getWebClientInstance(arg.token);
    return webClient.conversations.list(arg.option);
  });
  ipcMain.handle(appConst.IPC_SLACK_CHANNEL_INFO, (e, arg) => {
    const webClient = getWebClientInstance(arg.token);
    return webClient.conversations.info(arg.option);
  });
  ipcMain.handle(appConst.IPC_SLACK_USER_PROFILE, (e, arg) => {
    const webClient = getWebClientInstance(arg.token);
    return webClient.users.profile.get();
  });
  ipcMain.handle(appConst.IPC_SLACK_USER_INFO, (e, arg) => {
    const webClient = getWebClientInstance(arg.token);
    return webClient.users.info(arg.option);
  });
  ipcMain.handle(appConst.IPC_SLACK_POST_MESSAGE, (e, arg) => {
    const botWebClient = getWebClientBotInstance(arg.botToken);
    return botWebClient.chat.postMessage(arg.option);
  });
  ipcMain.handle(appConst.IPC_SLACK_CONVERSATIONS_HISTORY, (e, arg) => {
    const botWebClient = getWebClientBotInstance(arg.botToken);
    return botWebClient.conversations.history(arg.option);
  });
}
