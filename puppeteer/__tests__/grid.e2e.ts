import { kill } from 'process';
import { Browser, Page } from 'puppeteer';
import appConst from '../../app/modules/constants/appConst';
import {
  createQAAttributeSelector,
  getQASelectorByPosition,
  QA_ATTRIBUTES,
} from '../../app/modules/testUtil/testAttributes';
import { setupElectron } from './modules/util/setupElectron';
import { waitForNewWindowByTitle } from './modules/util/waitForNewWindowByTitle';

let electronBrowser: Browser;
let electronPage: Page;
let preferencePage: Page;
let pid: number;

beforeAll(async () => {
  [electronBrowser, electronPage, pid] = await setupElectron();
});

afterAll(async () => {
  electronPage.close();
  kill(pid);
});
jest.setTimeout(300000);
// 網羅テストはmain.e2eで実施する
// こちらはgridに特化したケースとする
describe('App', () => {
  beforeAll(async () => {
    await electronPage.waitForSelector(createQAAttributeSelector('LOGIN'));
    await electronPage.click(createQAAttributeSelector('SLACK_AUTH_BUTTON'));
    await (
      await electronPage.waitForSelector(
        createQAAttributeSelector('OPEN_MENU_ICON')
      )
    ).click();
    await (
      await electronPage.waitForSelector(
        createQAAttributeSelector('SCREEM_MENU_PREFERENCE')
      )
    ).click();
    preferencePage = await waitForNewWindowByTitle(
      electronBrowser,
      'preference'
    );
  });
  test('gridモードに変更', async () => {
    // TODO
    await (
      await preferencePage.waitForSelector(
        createQAAttributeSelector('SCREEN_MODE_SELECT')
      )
    ).select(appConst.SCREEN_MODE_GRID);
  });

  test('全てのセルを有効化する', async () => {
    const cells = await preferencePage.$$(
      createQAAttributeSelector('GRID_SETTING_CELL')
    );

    const promisses = cells.map(async (cell) => {
      const checkedIcon = await cell.$('[alt="checked"]');
      if (!checkedIcon) return cell;
      return null;
    });
    const innactiveCell = (await Promise.all(promisses)).filter(
      (result) => result
    );
    // 有効化されていないセルを全てクリックする
    const innactivePromisses = innactiveCell.map((cell) => cell.click());
    await Promise.all(innactivePromisses);
    const checked = await preferencePage.$$('[alt="checked"]');
    expect(checked.length).toBe(9);
  });

  test('設定を保存できる', async () => {
    await preferencePage.click(
      createQAAttributeSelector('SCREEN_SETTING_SUBMIT')
    );
    expect(
      await preferencePage.waitForSelector(
        createQAAttributeSelector('SCREEN_SETTING_SAVED')
      )
    );
  });

  test('デバッグ用チャンネルでwatchを開始する', async () => {
    await electronPage.waitForSelector(
      createQAAttributeSelector('SEARCH_CHANNEL_INPUT')
    );
    await electronPage.type(
      createQAAttributeSelector('SEARCH_CHANNEL_INPUT'),
      'bots_debug'
    );
    await electronPage.click(createQAAttributeSelector('CHANNEL_LIST_ITEM'));
    await electronPage.click(createQAAttributeSelector('WATCH_BUTTON'));
    expect(
      await electronPage.waitForSelector(
        createQAAttributeSelector('WATCH_SCREEN')
      )
    ).toBeTruthy();
  });

  test('メッセージが表示される', async () => {
    console.log(getQASelectorByPosition('left', 'top'));
    expect(
      await electronPage.waitForSelector(
        getQASelectorByPosition('left', 'top')
      )
    ).toBeTruthy();
    // TODO: 不具合修正
  });
});
