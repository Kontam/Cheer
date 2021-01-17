import { expectSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';
import { channelListSagas, pushSelectChannel } from '../../slackChannelList';
import { routes } from '../../../../../modules/constants/routes';
import { makeListWindow } from '../../../../effects/window';

// electronのgetCurrentWindowを含むためmockする 返り値はなし
jest.mock('../../../../../modules/windows/utils/makeWindowTransparent');

describe('Slack APIからメッセージを取得するフローのテスト', () => {
  function* saga() {
    yield channelListSagas[0];
  }
  test(
    'チャンネル選択画面遷移要求への処理\n' +
      '1. HOME画面に遷移\n' +
      '2. ウインドウサイズをデフォルトに変更',
    () => {
      return expectSaga(saga)
        .put(push(routes.HOME))
        .put(makeListWindow())
        .dispatch(pushSelectChannel())
        .run();
    }
  );
});
