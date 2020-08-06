var t = getApp();

Page(function (t, a, e) {
  return a in t ? Object.defineProperty(t, a, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[a] = e, t;
}({
    data: {
      hidden:true,
      fullScreen: !1,
      latitude: "34.82738",
      longitude: "113.551249",
      archData: t.globalData.map[0].place,
      windowWidth: "",
      windowHeight: "",
      isSelectedArch: 0,
      isSelectedArchType: 0,
      controls: [],
      isLocation: !0,
      branchCampus: ["莲花街校区", "嵩山路校区"],
      branchCampusValue: 0,
      scrollLeft: 0,
      isHidden: !0
    },
  onLoad: function (n) {
    wx.showShareMenu({
      withShareTicket: !0
    });
    var e = this;
    wx.getSystemInfo({
      success: function (t) {
        e.setData({
          windowWidth: t.windowWidth,
          windowHeight: t.windowHeight
        }), e.setControls(t.windowWidth, t.windowHeight / 2);
      }
    }), this.setData({
        archData: t.globalData.map[0].place
      });
    },
    onShareAppMessage: function() {},
    bindPickerBranch: function(a) {
        var e = this;
        this.setData({
            branchCampusValue: a.detail.value,
            archData: t.globalData.map[a.detail.value].place
        }), 1 != a.detail.value && 2 != a.detail.value || wx.showModal({
            title: "提示",
            content: "该校区暂未开放导览",
            success: function(a) {
                a.confirm ? e.setData({
                    archData: t.globalData.map[0].place,
                    branchCampusValue: 0
                }) : a.cancel && e.setData({
                    archData: t.globalData.map[0].place,
                    branchCampusValue: 0
                });
            }
        });
    },
  changeTap: function (t) {
    this.setData({
      isSelectedArchType: t.currentTarget.id,
      isSelectedArch: 0
    });
  },
  tohidden:function(){
    this.setData({
      hidden:false
    })
  },
    controltap: function(t) {
      -1 == t.controlId ? wx.navigateTo({
        url: "../search-position/search"
      }) : -2 == t.controlId ? wx.navigateTo({
        url: "../search/search"
      }) : -3 == t.controlId ? this.location() :console.log("e.controlId", t.controlId);
    },
    location: function() {
        var a = this;
        wx.getLocation({
            type: "wgs84",
            success: function(e) {
                t.globalData.latitude = e.latitude, t.globalData.longitude = e.longitude, a.setData({
                    latitude: e.latitude - 0.001,
                  longitude: e.longitude + 0.006
                });
            }
        });
    },
    markertap: function(t) {
        var a = t.markerId, e = a - 1;
        this.setData({
            isSelectedArch: a,
            scrollLeft: 150 * e
        }), console.log("e.markerId", t.markerId);
    },
    regionchange: function(t) {
        console.log(t.type);
    },
    clickBtn: function() {
        this.setData({
            fullScreen: !this.data.fullScreen,
            isHidden: !this.data.isHidden
        }), this.data.fullScreen ? this.setControls(this.data.windowWidth, this.data.windowHeight - 150) : this.setControls(this.data.windowWidth, this.data.windowHeight / 2);
    },
    setControls: function(t, a) {
        this.setData({
          controls: [{
            id: -1,
            iconPath: "../../images/search-position.png",
            position: {
              left: t - 40,
              top: a - 100,
              width: 30,
              height: 30
            },
            clickable: !0
            }, {
              id: -2,
              iconPath: "../../images/search.png",
              position: {
                left: t - 40,
                top: a-50,
                width: 30,
                height: 30
              },
              clickable: !0
            }, {
                id: -3,
                iconPath: "../../images/location.png",
                position: {
                    left: t - 40,
                    top: a,
                    width: 30,
                    height: 30
                },
                clickable: !0
            }]
        });
    }
},"onShareAppMessage", function() {
  return {
    imageUrl: "../../images/hautxb.png",
    title: "河工大校园导览-有你更精彩",
    path: "/pages/index/index"
  };
}));