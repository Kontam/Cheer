const PuppeteerEnvironment = require('jest-environment-puppeteer')

class CustomEnvironment extends PuppeteerEnvironment {
  async setup() {
    await super.setup()
    // Your setup
  }

  // jest-puppeteerのteardownを無効化する
  // テストのセットアップ時にグローバルで立ち上がるブラウザを閉じているため
  async teardown() {
    // Your teardown
    // await super.teardown()
  }
}

module.exports = CustomEnvironment
