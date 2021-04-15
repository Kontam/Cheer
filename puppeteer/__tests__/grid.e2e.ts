import { kill } from 'process';
import { Browser, Page } from 'puppeteer';
import { createQAAttributeSelector } from '../../app/modules/testUtil/testAttributes';
import { setupElectron } from './modules/util/setupElectron';
import {waitForNewWindowByTitle} from './modules/util/waitForNewWindowByTitle';

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
    await electronPage.waitFor(5000);
  });
  test('gridモードに変更して全てのセルを有効化できる', async () => {
    // TODO
  });
});
