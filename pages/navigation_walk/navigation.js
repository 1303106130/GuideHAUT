var t = getApp(), a = require("../../libs/amap-wx.js"), e = require("../../libs/config.js");

Page({
  data: {
    markers: [],
    distance: "",
    cost: "",
    polyline: [],
    latitude: null,
    longitude: null,
    desLati: 34.827662,
    desLong: 113.551437,
    deName: "河南工业大学"
  },
  onLoad: function (a) {
    var e = this;
    e.setData({
      longitude: t.globalData.longitude,
      latitude: t.globalData.latitude,
      desLati: a.latitude,
      desLong: a.longitude,
      deName: a.name
    }), wx.setNavigationBarTitle({
      title: a.name + "-路线规划"
      }), console.log(a.name), e.route(a), wx.getLocation({
      type: "gcj02",
      success: function (i) {
        t.globalData.latitude = i.latitude, t.globalData.longitude = i.longitude, e.setData({
          latitude: i.latitude,
          longitude: i.longitude
        }), e.route(a);
      }
    });
    wx.getSetting({
      success: (i) => {
        if (!i.authSetting['scope.userLocation'])
          e.openConfirm()
      }
    })
  },
  openConfirm: function () {
    wx.showModal({
      content: '检测到您没授予定位权限,请前往设置,完成后返回上一级页面重新选择该服务',
      confirmText: "确认",
      cancelText: "取消",
      success: function (i) {
        console.log(i);
        if (i.confirm) {
          console.log('用户点击确认')
          wx.openSetting({
            success: (i) => { }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },

  route: function (t) {
    var i = this, s = e.Config.key, n = new a.AMapWX({
      key: s
    }); n.getRidingRoute({
      origin: t.longitude + "," + t.latitude,
      destination: i.data.longitude + "," + i.data.latitude,
      success: function (a) {
        var e = [];
        if (a.paths && a.paths[0] && a.paths[0].steps) for (var s = a.paths[0].steps, n = 0; n < s.length; n++) for (var l = s[n].polyline.split(";"), o = 0; o < l.length; o++) e.push({
          longitude: parseFloat(l[o].split(",")[0]),
          latitude: parseFloat(l[o].split(",")[1])
        });
        i.setData({
          markers: [{
            iconPath: "../../images/mapicon_navi_e.png",
            id: 0,
            longitude: t.longitude,
            latitude: t.latitude,
            width: 23,
            height: 33
          }, {
            iconPath: "../../images/mapicon_navi_s.png",
            id: 0,
            longitude: i.data.longitude,
            latitude: i.data.latitude,
            width: 23,
            height: 33
          }],
          polyline: [{
            points: e,
            color: "#0091ff",
            width: 4
          }]
        }), a.paths[0] && a.paths[0].distance && i.setData({
          distance: "总距离约" + a.paths[0].distance + "米"
        }), a.paths[0] && a.paths[0].duration && i.setData({
          rideTime: "骑行约" + parseInt(a.paths[0].duration / 30) + "分钟"
        });
      }
    }), n.getWalkingRoute({
      origin: t.longitude + "," + t.latitude,
      destination: i.data.longitude + "," + i.data.latitude,
      success: function (t) {
        var a = [];
        if (t.paths && t.paths[0] && t.paths[0].steps) for (var e = t.paths[0].steps, s = 0; s < e.length; s++) for (var n = e[s].polyline.split(";"), l = 0; l < n.length; l++)
          a.push({
            longitude: parseFloat(n[l].split(",")[0]),
            latitude: parseFloat(n[l].split(",")[1])
          });
        t.paths[0] && t.paths[0].duration && i.setData({
          walkTime: "步行约" + parseInt(t.paths[0].duration / 60) + "分钟"
        });
      },
      fail: function (t) { }
    }), n.getDrivingRoute({
      origin: t.longitude + "," + t.latitude,
      destination: i.data.longitude + "," + i.data.latitude,
      success: function (t) {
        var a = [];
        if (t.paths && t.paths[0] && t.paths[0].steps) for (var e = t.paths[0].steps, s = 0; s < e.length; s++) for (var n = e[s].polyline.split(";"), l = 0; l < n.length; l++) a.push({
          longitude: parseFloat(n[l].split(",")[0]),
          latitude: parseFloat(n[l].split(",")[1])
        }); t.taxi_cost && i.setData({
          drive: "打车约" + parseInt(t.taxi_cost) + "元，"
        }), t.paths[0] && t.paths[0].duration && i.setData({
          driveTime: "约需要" + parseInt(t.paths[0].duration / 60) + "分钟"
        })
      },
      fail: function (t) { }
    });
  },
  goDetail: function () {
    var i = this;
    wx.navigateTo({
      url: '/pages/weather/weather'
    })
  },
  goGuide: function () {
    var t = this;
    wx.showModal({
      title: '提示',
      content: '打开页面后请在下方右侧选择手机已安装的地图app',
      success(res) {
        if (res.confirm) {
          wx.getLocation({
              type: "gcj02",
              success: function (a) {
                a.latitude, a.longitude;
                wx.openLocation({
                  latitude: parseFloat(t.data.desLati),
                  longitude: parseFloat(t.data.desLong),
                  name: t.data.deName,
                  scale: 26
                });
              }
            });
        }
      }
    });
  },
});