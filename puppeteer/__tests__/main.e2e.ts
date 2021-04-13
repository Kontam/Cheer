import kill from 'tree-kill';
import assert from 'power-assert';
import { setupElectron } from './modules/util/setupElectron';
import { Browser, Page } from 'puppeteer';
import { createQAAttributeSelector } from '../../app/modules/testUtil/testAttributes';
import { waitForNewWindowByTitle } from './modules/util/waitForNewWindowByTitle';
import appConst from '../../app/modules/constants/appConst';
import {create} from 'react-test-renderer';

let electronBrowser: Browser;
let electronPage: Page;
let preferencePage: Page;
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
    // 画面到達のアサーション
    expect(
      await electronPage.waitForSelector(
        createQAAttributeSelector('CHANNEL_LIST')
      )
    );
  });

  test('menuアイコンを押すとメニューが開く', async () => {
    await (
      await electronPage.waitForSelector(
        createQAAttributeSelector('OPEN_MENU_ICON')
      )
    ).click();
    expect(
      await electronPage.waitForSelector(
        createQAAttributeSelector('SCREEN_MENU')
      )
    ).toBeTruthy();
  });

  test('menuアイコン以外の場所を押すとメニューが閉じる', async () => {
    // 画面のアンクリッカブルな箇所をクリック
    await electronPage.click(createQAAttributeSelector('CHANNEL_LIST'));
    expect(
      await electronPage.$(createQAAttributeSelector('SCREEN_MENU'))
    ).toBeFalsy();
  });

  test('menuから設定画面を開ける', async () => {
    await electronPage.click(createQAAttributeSelector('OPEN_MENU_ICON'));
    await (
      await electronPage.waitForSelector(
        createQAAttributeSelector('SCREEM_MENU_PREFERENCE')
      )
    ).click();
    preferencePage = await waitForNewWindowByTitle(
      electronBrowser,
      'preference'
    );
    expect(preferencePage).toBeTruthy();
  });

  test('preferenceからconveyorモード, amount:3を設定して保存できる', async () => {
    await (
      await preferencePage.waitForSelector(
        createQAAttributeSelector('SCREEN_MODE_SELECT')
      )
    ).select(appConst.SCREEN_MODE_CONVEYOR);

    const amountField = await preferencePage.waitForSelector(
        createQAAttributeSelector('SCREEN_AMOUNT_FIELD')
      );
    await amountField.press('Backspace');
    await amountField.type('3');

    await preferencePage.click(
      createQAAttributeSelector('SCREEN_SETTING_SUBMIT')
    );
    expect(
      await preferencePage.waitForSelector(
        createQAAttributeSelector('SCREEN_SETTING_SAVED')
      )
    );
  });

  test('Channel検索テキストボックスに文字列が入力すると該当チャンネルが表示される', async () => {
    // TODO: Menuの検証？
    // TODO: HorizonConveyorに明示的に変更する
    await electronPage.waitForSelector(
      createQAAttributeSelector('SEARCH_CHANNEL_INPUT')
    );
    await electronPage.type(
      createQAAttributeSelector('SEARCH_CHANNEL_INPUT'),
      'bots_debug'
    );
    const text = await electronPage.$(
      createQAAttributeSelector('CHANNEL_LIST_ITEM')
    );
    expect(text).toMatch('bots_debug');
  });

  test('チャンネルを選択してWatchボタンを押下するとWatchが開始される', async () => {
    await electronPage.click(createQAAttributeSelector('CHANNEL_LIST_ITEM'));
    await electronPage.click(createQAAttributeSelector('WATCH_BUTTON'));

    expect(
      await electronPage.waitForSelector(
        createQAAttributeSelector('WATCH_SCREEN')
      )
    ).toBeTruthy();
  });

  test('メッセージが表示される', async () => {
    expect(
      await electronPage.waitForSelector(
        createQAAttributeSelector('CONVEYOR_MESSAGE')
      )
    ).toBeTruthy();
  });

  // しばらく待って３個メッセージが出ることをアサーションする
  test('8秒後には設定したamount+1の数だけメッセージが表示されている', async () => {
    await electronPage.waitFor(8000);
    const messages = await electronPage.$$(createQAAttributeSelector('CONVEYOR_MESSAGE'));
    expect(messages.length).toBe(4);
  });

  // Amount2に切り替えて反映されるかアサーションする
  test('amount設定の変更が反映される', async () => {
    const amountField = await preferencePage.waitForSelector(
      createQAAttributeSelector('SCREEN_AMOUNT_FIELD')
    );
    await amountField.press('Backspace');
    await amountField.type('2');
    await preferencePage.click(
      createQAAttributeSelector('SCREEN_SETTING_SUBMIT')
    );
    await preferencePage.waitForSelector(createQAAttributeSelector('SCREEN_SETTING_SAVED'));

    await electronPage.waitFor(2000);
    const messages = await electronPage.$$(createQAAttributeSelector('CONVEYOR_MESSAGE'));
    expect(messages.length).toBe(3);
  });
});
