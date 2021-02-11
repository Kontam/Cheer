const { notarize } = require('electron-notarize');
const path = require('path');

const appleId = 'tehayan0111@gmail.com';
const appleIdPassword = 'aslz-ioau-xhvk-trbt';
const configPath = path.resolve(__dirname, '../../package.json');
const appPath = path.resolve(__dirname, '../../release/mac/Cheer.app');
const config = require(configPath);
const appBundledId = 'config.build.appId';

async function notarizeApp() {
  console.log('start notarize');
  await notarize({
    appBundledId,
    appPath,
    appleId,
    appleIdPassword,
  });
  console.log('after notarize');
}

exports.default = async () => {
  await notarizeApp();
};
