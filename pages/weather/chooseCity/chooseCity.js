var t = require("../../../utils/staticData.js"),
  e = require("../../../utils/util.js");

Page({
  data: {
    alternative: null,
    cities: [],
    showItems: null,
    inputText: "",
    hotCities: [{
      name: "北京"
    }, {
      name: "上海"
    }, {
      name: "广州"
    }, {
      name: "深圳"
    }, {
      name: "南京"
    }, {
      name: "杭州"
    }, {
      name: "苏州"
    }, {
      name: "厦门"
    }, {
      name: "重庆"
    }, {
      name: "西安"
    }, {
      name: "郑州"
    }]
  },
  reset: function() {
    this.setData({
      inputText: "",
      showItems: this.data.cities
    });
  },
  inputFilter: function(t) {
    var i = {},
      a = this.data.cities,
      s = t.detail.value.replace(/\s+/g, "");
    if (s.length) {
      for (var n in a)
        for (var r = a[n], l = 0, u = r.length; l < u; l++) {
          var c = r[l]; -
          1 !== c.name.indexOf(s) && (e.isEmptyObject(i[n]) && (i[n] = []), i[n].push(c));
        }
      e.isEmptyObject(i) && (i = null), this.setData({
        alternative: i,
        showItems: i
      });
    } else this.setData({
      alternative: null,
      showItems: a
    });
  },
  getSortedAreaObj: function(t) {
    for (var e = {}, i = 0, a = (t = t.sort(function(t, e) {
        return t.letter > e.letter ? 1 : t.letter < e.letter ? -1 : 0;
      })).length; i < a; i++) {
      var s = t[i];
      delete s.districts;
      var n = s.letter;
      e[n] || (e[n] = []), e[n].push(s);
    }
    return e;
  },
  choose: function(t) {
    var e = t.currentTarget.dataset.name,
      i = getCurrentPages(),
      a = i[i.length - 2];
    e ? a.search(e, function() {
      wx.navigateBack({});
    }) : a.init({}, function() {
      console.log("init")
      wx.navigateBack({});
    });
  },
  onLoad: function() {
    var e = this.getSortedAreaObj(t.cities || []);
    this.setData({
      cities: e,
      showItems: e
    });
  }
});