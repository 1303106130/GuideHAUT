var t = require("config.js");
var util = require('utils/util.js');
let okayapi = require('utils/okayapi.js')
App({
  onLaunch: function() {
    var t = this;
    var that = this;
    wx.login({
      success: function(t) {
        let params = {
            s: "App.Weixin.GetWeixinInfoMini",
            code: t.code
          },
          paramsmessage = {
            s: "App.Table.FreeFindOne",
            model_name: "message",
            where: "[[\"state\",\"=\",\"" + "show" + "\"]]"
          }
        wx.request({
          url: that.globalData.okayapiHost,
          data: okayapi.enryptData(paramsmessage),
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function(res) {
            if (res.data.data.err_code==0){
            var temp = res.data.data.data;
            that.globalData.messagetitle = temp.title;
            that.globalData.message = temp;
            }
          }
        })
        wx.request({
          url: that.globalData.okayapiHost,
          data: okayapi.enryptData(params),
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function(res) {
            console.log(res);
            that.globalData.openid = res.data.data.openid;
            let params = {
                s: "App.Table.Create",
                model_name: "userLog",
                data: "{\"openid\": \"" + res.data.data.openid +
                  "\",\"logintime\": \"" + util.formatTime(new Date()) + "\"}"
              },
              params2 = {
                s: "App.Table.CheckCreate",
                model_name: "userinfo",
                data: "{\"openid\": \"" + res.data.data.openid +
                  "\",\"endtime\": \"" + util.formatTime(new Date()) +
                  "\",\"count\": \"" + "1" + "\"}",
                check_field: "openid"
              }
            wx.request({
                url: that.globalData.okayapiHost,
                data: okayapi.enryptData(params),
                method: "POST",
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
              }),
              wx.request({
                url: that.globalData.okayapiHost,
                data: okayapi.enryptData(params2),
                method: "POST",
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function(res) {
                  console.log(res)
                  var userInfo = that.globalData.userInfo;
                  //获取已经登陆过的用户信息
                  if (userInfo) {
                    let params = {
                      s: "App.Table.FreeUpdate",
                      model_name: "userinfo",
                      where: "[[\"openid\",\"=\",\"" + that.globalData.openid + "\"]]",
                      data: "{\"user_nickname\": \"" + userInfo.nickName +
                        "\",\"user_gender\": \"" + userInfo.gender +
                        "\",\"user_province\": \"" + userInfo.province +
                        "\",\"user_city\": \"" + userInfo.city + "\"}"
                    }
                    wx.request({
                      url: "https://hd215.api.yesapi.cn/",
                      data: okayapi.enryptData(params),
                      method: "POST",
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      success: function(res) {
                        console.log(res);
                      }
                    })
                  }
                  if (res.data.data.err_code == 3) {
                    let paramstime = {
                        s: "App.Table.FreeUpdate",
                        model_name: "userinfo",
                        where: "[[\"openid\",\"=\",\"" + that.globalData.openid + "\"]]",
                        data: "{\"endtime\": \"" + util.formatTime(new Date()) + "\"}",
                      },
                      params = {
                        s: "App.Table.FreeChangeNumber",
                        model_name: "userinfo",
                        where: "[[\"openid\",\"=\",\"" + that.globalData.openid + "\"]]",
                        change_field: "count",
                        change_value: "1"
                      }
                    wx.request({
                      url: that.globalData.okayapiHost,
                      data: okayapi.enryptData(paramstime),
                      method: "POST",
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      success: function(res) {
                        console.log(res)
                      }
                    })
                    wx.request({
                      url: that.globalData.okayapiHost,
                      data: okayapi.enryptData(params),
                      method: "POST",
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      success: function(res) {
                        console.log(res)
                      }
                    })
                  }
                }
              })
          }
        })
      }
    }), wx.getSetting({
      success: function(a) {
        a.authSetting["scope.userInfo"] && wx.getUserInfo({
          success: function(a) {
            t.globalData.userInfo = a.userInfo, t.userInfoReadyCallback && t.userInfoReadyCallback(a);
          }
        });
      }
    });
    var a = this;
    a.globalData.map = a.loadMap(), a.globalData.position = a.loadPosition(), this.debug || a.updateMap(function(t) {
        a.globalData.map = t.map, a.globalData.position = t.position;
      }),
      wx.getSetting({
        success: function(t) {
          t.authSetting["scope.userLocation"] && wx.getLocation({
            type: "wgs84",
            success: function(t) {
              a.globalData.latitude = t.latitude, a.globalData.longitude = t.longitude,
                a.globalData.isLocation = !0;
            }
          });
        }
      });
  },
  loadMap: function() {
    var t = this.school.map;
    if (!this.debug) try {
      var a = wx.getStorageSync("map");
      a && (a[0].name, t = a);
    } catch (t) {
      console.log(t);
    }
    for (var o = 0; o < t.length; o++)
      for (var n = 0; n < t[o].place.length; n++) t[o].place[n].id = n + 1;
    return t;
  },
  loadPosition: function() {
    var t = this.school.position;
    if (this.debug) return t;
    try {
      var a = wx.getStorageSync("position");
      if (a) return a.name, a;
    } catch (t) {
      console.log(t);
    }
    return t;
  },
  updateMap: function(a) {
    wx.request({
      url: t.updateUrl,
      data: {},
      header: {
        "content-type": "application/json"
      },
      success: function(t) {
        t.data.map && t.data.map.length > 0 && (console.log("updata netword data"), wx.setStorage({
          key: "map",
          data: t.data.map
        }), wx.setStorage({
          key: "position",
          data: t.data.position
        }), "function" == typeof a && a(t.data));
      }
    });
  },
  debug: t.debug,
  school: require("/utils/position.js"),
  globalData: {
    userInfo: null,
    map: null,
    temp: "好好学习，天天向上。",
    messagetitle: "",
    message:null,
    position: null,
    latitude: null,
    longitude: null,
    okayapiHost: "https://hd215.api.yesapi.cn",
    okayApiAppKey: "CBE51861C53ECC63FC1085114B54AC34",
    okayApiAppSecrect: "w4myQ3xjI6yDKefTL9DkujIecbhtHTYIg42RjzzKoizH1sqYOo7H1u3lBpcPy1yqTLMgV"
  }
});