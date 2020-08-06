let okayapi = require('../../utils/okayapi.js')
const app = getApp()
Page({
  data: {
    motto: '==',
    imageMode: "scaleToFill",
    combineAlertShowHide: "none"
  },
  okayApiHelloWorld: function(e) {
    let params = {
      s: "Guest_Counter.SmartRefresh",
      name: "zxin",
      type: "forever",
      other_uuid: "68CD76B90AE1F0BD6AF42C41F7521A25"
    };
    let _self = this
    wx.request({
      url: app.globalData.okayapiHost,
      data: okayapi.enryptData(params),
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(wxRes) {
        let res = wxRes.data
        if (res.data && res.data.err_code == 0) {
          console.log('获取使用人数成功: ', res.data)
          _self.setData({
            motto: res.data.after_value
          })
        } else {
          console.log('获取使用人数失败: ', res)
          _self.setData({
            motto: res.data.err_msg
          })
        }
      }
    })
  },
  onLoad: function(n) {
    this.okayApiHelloWorld()
    wx.setNavigationBarTitle({
      title: "学校简介"
    });
  },
  copyurl: function() {
    wx.setClipboardData({
      data: "https://720yun.com/t/3922fmO5jyg?from=timeline&isappinstalled=0&pano_id=870286",
      success: function(n) {
        wx.showToast({
          title: "复制成功",
          icon: "success"
        });
      }
    });
  },
  showConnectionAlert: function() {
    this.setData({
      combineAlertShowHide: "flex"
    });
  },
  hideAlert: function() {
    this.setData({
      combineAlertShowHide: "none"
    });
  },
  previewimg: function(event) {
    var src = event.currentTarget.dataset.src;
    var list = [
      "https://gitee.com/zxin1210/Myre/raw/master/images/intro1.jpg",
      "https://gitee.com/zxin1210/Myre/raw/master/images/intro2.jpg", "https://gitee.com/zxin1210/Myre/raw/master/images/intro5.jpg", "https://gitee.com/zxin1210/Myre/raw/master/images/intro3.jpg", "https://gitee.com/zxin1210/Myre/raw/master/images/intro4.jpg"
    ]
    wx.previewImage({
      current: src,
      urls: list
    })
  },
  onShareAppMessage: function() {
    return {
      imageUrl: "../../images/hautxb.png",
      title: "河工大校园导览-有你更精彩",
      path: "/pages/index/index"
    };
  }
});