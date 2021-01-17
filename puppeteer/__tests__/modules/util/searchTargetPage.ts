import { Page } from "puppeteer";

export async function searchTargetPage(pages: Page[]) {
  const promises = pages.map(async (page) => {
    const title = await page.title();
    if(title === 'Cheer') {
      return page; 
    }
    return null;
  });
  const result = await Promise.all(promises);
  return result.find(page => page); 
}
