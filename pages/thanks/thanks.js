const n = getApp()
var util = require('../../utils/util.js');
let okayapi = require('../../utils/okayapi.js')
Page({
  onShareAppMessage: function() {
    return {
      title: '河南工业大学导览',
      path: '/pages/index/index',
      imageUrl: '../../images/c8.png'
    }
  },
  data: {
    userInfo: {},
    hasUserInfo: false,
    mode: 'wechatpay',
    imageUrl: '../../images/reward.jpg',
    canIUse: wx.canIUse("button.open-type.getUserInfo")
  },
  previewImage: function() {
    var a = {
      wechatpay: ["https://gitee.com/zxin1210/haut_guide/raw/master/images/reward.png"]
    };
    wx.previewImage({
      urls: a[this.data.mode]
    });
  },
  a() {
    wx.navigateTo({
      url: 'intro/intro',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  c() {
    wx.navigateTo({
      url: 'updatelog/updatelog',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onClickCacheModal: function() {
    wx.showModal({
      content: '清理缓存会导致数据和图片重新加载',
      confirmText: '确定',
      cancelText: '取消',
      success: function(res) {
        if (res.confirm) {
          wx.clearStorage({
            success: function(res) {
              console.log(res);
            }
          });
          wx.showLoading({
            title: '清除缓存中',
            duration: 900,
            complete: function(r) {
              setTimeout(function() {
                wx.showToast({
                  title: '清理完成',
                  icon: "success",
                  duration: 800
                })
              }, 800)
            }
          })
        }
      }
    })
  },
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: "关于我们"
    });
    if (n.globalData.userInfo) {
      this.setData({
        userInfo: n.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      n.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          n.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    let params = {
      s: "App.Table.FreeUpdate",
      model_name: "userinfo",
      where: "[[\"openid\",\"=\",\"" + n.globalData.openid + "\"]]",
      data: "{\"user_nickname\": \"" + e.detail.userInfo.nickName +
        "\",\"user_gender\": \"" + e.detail.userInfo.gender +
        "\",\"user_province\": \"" + e.detail.userInfo.province +
        "\",\"user_city\": \"" + e.detail.userInfo.city + "\"}"
    }
    wx.request({
      url: "https://hd215.api.yesapi.cn/",
      data: okayapi.enryptData(params),
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log("补充基本信息成功");
      }
    })
    n.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})