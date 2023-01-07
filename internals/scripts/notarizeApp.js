const { notarize } = require('electron-notarize');
require('dotenv').config();
const path = require('path');

const appleId = process.env.APPLE_ID;
const appleIdPassword = process.env.APPLE_APP_ID_PW;
const configPath = path.resolve(__dirname, '../../package.json');
const appPath = path.resolve(__dirname, '../../release/mac/Cheer.app');
const config = require(configPath);
const appBundledId = process.env.APPLE_BUNDLE_ID;
const ascProvider = process.env.APPLE_ASC_PROVIDER;

async function notarizeApp() {
  console.log('start notarize');
  await notarize({
    appBundledId,
    appPath,
    appleId,
    appleIdPassword,
    ascProvider,
  });
  console.log('after notarize');
}

exports.default = async () => {
  await notarizeApp();
};
