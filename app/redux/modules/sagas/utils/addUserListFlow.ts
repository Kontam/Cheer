import uniqBy from 'lodash.uniqby';
import { call, put, select, all } from 'redux-saga/effects';

import { AuthInfo, Member, Members, RootState } from '../../types';
import {
  UserMessage,
  SlackUserInfoResponse,
  getWebClientInstance,
} from '../../../../modules/util/requests/webClient';
import { preloadImage } from '../../../../modules/util/preloadImage';
import { addMembers } from '../../app/members';
import { ipcRenderer } from '../../../../modules/util/exposedElectron';
import appConst from '../../../../modules/constants/appConst';

export const memberSelector = (state: RootState) => state.app.members;
export const authInfoSelector = (state: RootState) => state.user.authInfo;

// メッセージリストの中のユーザーに未追加メンバーがいればメンバー追加する
export function* addUserListFlow(userMessages: UserMessage[]) {
  const messagesUniqByUserId = uniqBy(userMessages, 'user');
  const members: Member[] = yield select(memberSelector);
  const required = messagesUniqByUserId.filter(
    (message) => !members.some((member) => message.user === member.id)
  );
  const authInfo: AuthInfo = yield select(authInfoSelector);
  const effects = required.map((message) =>
    call(ipcRenderer.invoke, appConst.IPC_SLACK_USER_INFO, {
      token: authInfo.token,
      option: {
        user: message.user,
      },
    })
  );
  const results: SlackUserInfoResponse[] = yield all(effects);
  const newMembers: Members = results.map((userInfo) => {
    preloadImage(userInfo.user.profile.image_72);
    return {
      id: userInfo.user.id,
      iconUrl: userInfo.user.profile.image_72,
      name:
        userInfo.user.profile.display_name !== ''
          ? userInfo.user.profile.display_name
          : userInfo.user.profile.real_name, // display_nameが空欄の人もいる
      real_name: userInfo.user.profile.real_name,
    };
  });
  yield put(addMembers(newMembers));
}
