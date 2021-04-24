import { Page } from "puppeteer";
import { createQAAttributeSelector } from "../../../../app/modules/testUtil/testAttributes";

/**
 * 設定画面のセルをステータス指定で取得する
 * @param active
 */
export async function getGridSettingCells(page: Page, active?: boolean) {
    const cells = await page.$$(
      createQAAttributeSelector('GRID_SETTING_CELL')
    );
    const promisses = cells.map(async (cell) => {
      const checkedIcon = await cell.$('[alt="checked"]');
      switch(active) {
        case true:
          return checkedIcon ? cell : null;
        case false:
          return checkedIcon ? null : cell;
        case undefined:
          return cell;
      }
    });
    return (await Promise.all(promisses)).filter(
      (result) => result
    );
}
