import kill from 'tree-kill';
import assert from 'power-assert';
import { setupElectron } from './modules/util/setupElectron';
import { Browser, Page } from 'puppeteer';
import { createQAAttributeSelector } from '../../app/modules/testUtil/testAttributes';

let electronBrowser: Browser;
let electronPage: Page;
let pid: number;

beforeAll(async () => {
  // jest-puppeteerが立ち上げるブラウザを閉じる
  const pages = await (browser as any).pages();
  await Promise.all(pages.map((page) => page.close()));

  [electronBrowser, electronPage, pid] = await setupElectron();
});

afterAll(async () => {
  electronPage.close();
  kill(pid);
});

describe('App', () => {
  test('初期起動時、Login画面が表示される', async () => {
    await electronPage.waitForSelector(createQAAttributeSelector('LOGIN'));
    const login = await electronPage.$(createQAAttributeSelector('LOGIN'));
    assert.ok(login);
  });

  test('トップ画面のLoginボタン押下でリスト画面に遷移する', async () => {
    // E2Eビルドでは認証をスキップしている
    await electronPage.click(createQAAttributeSelector('SLACK_AUTH_BUTTON'));
    await electronPage.waitFor(2000);
  });

  test('Channel検索テキストボックスに文字列が入力すると該当チャンネルが表示される', async () => {
    // inputのQA属性は埋めたのでそれを取り出す
    await electronPage.type(
      createQAAttributeSelector('SEARCH_CHANNEL_INPUT'),
      'bots_debug'
    );
    await electronPage.click(createQAAttributeSelector('CHANNEL_LIST_ITEM'));
    await electronPage.click(createQAAttributeSelector('WATCH_BUTTON'));
    await electronPage.waitFor(5000);
  });
});
