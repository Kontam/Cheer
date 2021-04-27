import { kill } from 'process';
import { Browser, Page } from 'puppeteer';
import appConst from '../../app/modules/constants/appConst';
import {
  createQAAttributeSelector,
  getQASelectorByPosition,
} from '../../app/modules/testUtil/testAttributes';
import { getGridSettingCells } from './modules/util/getGridCells';
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
jest.setTimeout(10000);
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
  describe('メッセージ表示確認', () => {
    test('gridモードに変更', async () => {
      // TODO
      await (
        await preferencePage.waitForSelector(
          createQAAttributeSelector('SCREEN_MODE_SELECT')
        )
      ).select(appConst.SCREEN_MODE_GRID);
    });

    test('全てのセルを有効化する', async () => {
      const innactiveCell = await getGridSettingCells(preferencePage, false);
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
  });

  describe('メッセージ表示確認', () => {
    test('メッセージが表示される 左 上', async () => {
      expect(
        await electronPage.waitForSelector(
          getQASelectorByPosition('left', 'top')
        )
      ).toBeTruthy();
    }, 30000);
    test('メッセージが表示される 中央 上', async () => {
      expect(
        await electronPage.waitForSelector(
          getQASelectorByPosition('center', 'top')
        )
      ).toBeTruthy();
    });
    test('メッセージが表示される 右 上', async () => {
      expect(
        await electronPage.waitForSelector(
          getQASelectorByPosition('right', 'top')
        )
      ).toBeTruthy();
    });
    test('メッセージが表示される 左 中央', async () => {
      expect(
        await electronPage.waitForSelector(
          getQASelectorByPosition('left', 'center')
        )
      ).toBeTruthy();
    });
    test('メッセージが表示される 中央　中央', async () => {
      expect(
        await electronPage.waitForSelector(
          getQASelectorByPosition('center', 'center')
        )
      ).toBeTruthy();
    });
    test('メッセージが表示される 右 中央', async () => {
      expect(
        await electronPage.waitForSelector(
          getQASelectorByPosition('right', 'center')
        )
      ).toBeTruthy();
    });
    test('メッセージが表示される 左 下', async () => {
      expect(
        await electronPage.waitForSelector(
          getQASelectorByPosition('left', 'bottom')
        )
      ).toBeTruthy();
    });
    test('メッセージが表示される 中央 下', async () => {
      expect(
        await electronPage.waitForSelector(
          getQASelectorByPosition('center', 'bottom')
        )
      ).toBeTruthy();
    });
    test('メッセージが表示される 右 下', async () => {
      expect(
        await electronPage.waitForSelector(
          getQASelectorByPosition('right', 'bottom')
        )
      ).toBeTruthy();
    });
  });

  describe('設定変更反映確認', () => {
    test('グリッド設定を1セルを残して他を無効化する', async () => {
      const activeCell = await getGridSettingCells(preferencePage, true);
      const activePromisses = activeCell.map((cell, index) => {
        if(index !== 0) return cell.click();
        return new Promise((resolve => resolve(undefined)));
      });
      await Promise.all(activePromisses);
      const checked = await preferencePage.$$('[alt="checked"]');
      expect(checked.length).toBe(1);
      await preferencePage.waitFor(5000);
    });
  })
});
