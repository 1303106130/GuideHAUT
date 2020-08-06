let okayapi = require('../../utils/okayapi.js');
var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    mode: 'wechatpay'
  },
  onLoad: function(n) {
    var that = this;
    setTimeout(function () {
      if (app.globalData.message) {
        that.setData({
          messagetitle: app.globalData.messagetitle,
          hasmessage: true
        })
      }
    }, 2000)
    var o = this;
    wx.getSystemInfo({
      success: function(n) {
        o.setData({
          height: n.windowHeight
        });
      }
    });
  },
  onShareAppMessage: function() {
    return {
      imageUrl: "../../images/hautxb.png",
      title: "河工大校园导览-有你更精彩",
      path: "/pages/index/index"
    };
  },
  gotoIntro: function() {
    wx.navigateTo({
      url: "/pages/intro/intro"
    });
  },
  gotoweather:function(){
    wx.navigateTo({
      url: "/pages/weather/weather"
    });
  },
  gotomessage:function(){
    wx.navigateTo({
      url: '/pages/thanks/updatelog/updatelog',
    })
  },
  gotoGuide: function() {
    wx.navigateTo({
      url: "/pages/map/map"
    });
  },
  gotoAbout: function() {
    wx.navigateTo({
      url: "/pages/thanks/thanks"
    });
  },
  gotothanks:function(){
    var a = {
      wechatpay: ["https://gitee.com/zxin1210/haut_guide/raw/master/images/reward.png"]
    };
    wx.previewImage({
      urls: a[this.data.mode]
    });
  }
});