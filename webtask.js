const tools = require('auth0-extension-tools');
const expressApp = require('./server');

module.exports = tools.createExpressServer((req, config) => {
  console.log('Starting User Import/Export Extension - Version:', config('CLIENT_VERSION'));
  return expressApp(config);
});
