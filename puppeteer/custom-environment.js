const PuppeteerEnvironment = require('jest-environment-puppeteer')

class CustomEnvironment extends PuppeteerEnvironment {
  async setup() {
    await super.setup()
    // jest-puppeteerが立ち上げるブラウザを閉じる
    const pages = await this.global.browser.pages();
    await Promise.all(pages.map((page) => page.close()));
  }

  // jest-puppeteerのteardownを無効化する
  // テストのセットアップ時にグローバルで立ち上がるブラウザを閉じているため
  async teardown() {
    // Your teardown
    // await super.teardown()
  }
}

module.exports = CustomEnvironment
