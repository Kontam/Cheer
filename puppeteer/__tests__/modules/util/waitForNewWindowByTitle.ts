import { Browser, Page } from 'puppeteer';

export function waitForNewWindowByTitle(browser: Browser, title: string) {
  return new Promise<Page>((resolve, reject) => {
    browser.on('targetcreated', async (target) => {
      const newPage = await target.page();
      if (!newPage) {
        return;
      }
      if ((await newPage.title()) !== title) {
        return;
      }
      resolve(newPage);
    });
  });
}
