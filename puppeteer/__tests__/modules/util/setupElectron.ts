import puppeteer, {Browser, Page} from 'puppeteer';
import electron from 'electron';
import { spawn } from 'child_process';
import path from 'path';
import {searchTargetPage} from './searchTargetPage';

export async function setupElectron(): Promise<[Browser, Page, number]> {
  const startTime = Date.now();
  const timeout = 20000;
  const port = 9200;
  const entry = path.join('app','main.prod.js');
  let browser: Browser;
  let page: Page;
  let pid: number;

  // Start Electron with custom debugging port
  pid = spawn(
    electron as any,
    [entry , `--remote-debugging-port=${port}`],
    {
      shell: true,
    }
  ).pid;

  // Wait for Puppeteer to connect
  while (!browser) {
    try {
      browser = await puppeteer.connect({
        browserURL: `http://localhost:${port}`,
        defaultViewport: { width: 600, height: 600 },
      });
      // backgroundのpageも作られるのでテスト対象のpageを見つける必要がある
      const pages = await browser.pages();
      page = await searchTargetPage(pages);
      if (!page) throw new Error('cannnot find Cheer');
    } catch (error) {
      if (Date.now() > startTime + timeout) {
        throw error;
      }
    }
  }

  return [
    browser,
    page,
    pid,
  ]
}
