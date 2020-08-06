var a = getApp();

Page({
  data: {
    keyword: null,
    buildlData: a.globalData.map[0].place,
    showData: null,
    cursor: 0
  },
  bindSearchInput: function (a) {
    var n = new Array(), o = this.data.buildlData;
    if (a.detail.cursor >= this.data.cursor) {
      console.log("输入文字");
      var t = a.detail.value.replace(/(^\s*)|(\s*$)/g, "");
      if (t) {
        var e = 0, i = 100;
        for (var d in o) for (var r in o[d].data) if (-1 != o[d].data[r].name.indexOf(t)) {
          var l = o[d].data[r];
          l.tid = d,  l.bid = r, e += 1, l.index = e, n.push(l);
        } else if (-1 != o[d].data[r].description.indexOf(t)) {
          var s = o[d].data[r];
          s.tid = d, s.bid = r,i += 1, s.index = i, n.push(s);
        }
        for (r = 0; r < n.length; r++) for (var u = 0; u < n.length - r - 1; u++) if (n[u].index > n[u + 1].index) {
          var f = n[u];
          n[u] = n[u + 1], n[u + 1] = f, console.log("交换" + n[u].index + ":" + n[u + 1].index);
        }
        console.log(n), this.setData({
          showData: n
        });
      }
    } else console.log("删除文字"), this.setData({
      showData: null
    });
    this.data.cursor = a.detail.cursor;
  },
  onLoad: function (a) {
    wx.setNavigationBarTitle({
      title: "搜索"
    });
   },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },
  reset: function () {
    this.setData({
      keyword: null
    });
  }
});