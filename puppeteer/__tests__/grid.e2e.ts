import { kill } from 'process';
import { Browser, Page } from 'puppeteer';
import appConst from '../../app/modules/constants/appConst';
import {
  createQAAttributeSelector,
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

// 網羅テストはmain.e2eで実施する
// こちらはgridに特化したケースとする

describe('App', () => {
  beforeEach(async () => {
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
    await Promise.all(innactiveCell.map((cell) => cell.click()));

    await electronPage.waitFor(5000);
  });
});
