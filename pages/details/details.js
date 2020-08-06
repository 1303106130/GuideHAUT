var n = getApp();

Page({
    data: {
        tid: 0,
        bid: 0,
        arching: {
            img: []
        }
    },
    onLoad: function(t) {
        var a = parseInt(t.bid), i = parseInt(t.tid), o = parseInt(t.branchNum);
        if (t.bid && t.tid) e = n.globalData.map[o].place[i].data[a]; else var e = n.globalData.position;
        this.setData({
            bid: a,
            tid: i,
            arching: e
        }), wx.setNavigationBarTitle({
            title: e.name
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
      return {
        imageUrl: "../../images/hautxb.png",
        title: "河工大校园导览-有你更精彩",
        path: "/pages/index/index"
      };
    }
});