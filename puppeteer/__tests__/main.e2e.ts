import kill from 'tree-kill';
import assert from 'power-assert';
import { setupElectron } from './modules/util/setupElectron';
import { Browser, Keyboard, Page } from 'puppeteer';
import { QA_ATTRIBUTES, createQAAttributeSelector } from '../../app/modules/testUtil/testAttributes';

const timeout = 20000;
let electronBrowser: Browser;
let electronPage: Page;
let pid: number;

jest.setTimeout(timeout);

beforeAll(async () => {
  // jest-puppeteerが立ち上げるブラウザを閉じる
  const pages = await (browser as any).pages(); 
  await Promise.all(pages.map((page) => page.close()));

  [electronBrowser, electronPage, pid] = await setupElectron();
});

afterAll(async () => {
  try {
    console.log('afterAll', pid);
    await electronPage.close();
  } catch (error) {
    kill(pid);
  }
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

  test('トップ画面のLoginボタン押下でリスト画面に遷移する', async () => {
    await electronPage.keyboard.down('Meta');
    await electronPage.keyboard.press('p');
    //await electronPage.keyboard.up('Meta');
    await electronPage.waitFor(10000);
  });

});
