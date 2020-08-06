let util = require('./md5.js')  

function enryptData (params) {
  const app = getApp()
  
  const OKAYAPI_APP_KEY = app.globalData.okayApiAppKey
  const OKAYAPI_APP_SECRECT = app.globalData.okayApiAppSecrect

  params['app_key'] = OKAYAPI_APP_KEY
  params['sign'] = ''

  var sdic = Object.keys(params).sort();
  var paramsStrExceptSign = "";
  for (let ki in sdic) {
    paramsStrExceptSign += params[sdic[ki]];
  }

  var sign = util.hexMD5(paramsStrExceptSign + OKAYAPI_APP_SECRECT).toUpperCase();
  params['sign'] = sign;

  return params;
}

module.exports = {
  enryptData: enryptData
}  