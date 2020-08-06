Page({
  data: {
    city: "",
    location: "",
    updateTime: "",
    temperature: "",
    weather: "",
    day7Weather: [],
    nowWeather: {},
    airQuality: {},
    qlty: "",
    lifeStyle: [],
    hourlyWeather: [],
    bgstyle:"",
    wertherObj: {
      key: ["tmp", "fl", "hum", "pcpn", "wind_dir", "wind_deg", "wind_sc", "wind_spd", "vis", "pres", "cloud", ""],
      val: {
        tmp: "温度(℃)",
        fl: "体感温度(℃)",
        hum: "相对湿度(%)",
        pcpn: "降水量(mm)",
        wind_dir: "风向",
        wind_deg: "风向角度",
        wind_sc: "风力(级)",
        wind_spd: "风速(mk/h)",
        vis: "能见度(km)",
        pres: "气压(mb)",
        cloud: "云量"
      }
    },
    lifeQuality: {
      comf: "舒适度",
      drsg: "穿衣",
      flu: "感冒",
      sport: "运动",
      trav: "旅游",
      uv: "紫外线",
      cw: "洗车",
      air: "空气质量"
    }
  },
  getWeather: function (e) {
    wx.showLoading({
      title: "加载中"
    });
    var t = this;
    wx.request({
      url: "https://free-api.heweather.com/s6/weather/forecast",
      data: {
        location: e,
        key: "ee55050ad82747be957a6827a201948b"
      },
      method: "GET",
      header: {
        "Content-Type": "application/json"
      },
      success: function (a) {
        for (var o = a.data.HeWeather6[0].daily_forecast, c = 0; c < a.data.HeWeather6[0].daily_forecast.length; c++) o[c].date = 0 === c ? "今天" : 1 === c ? "明天" : t.dateToWeek(o[c].date);
        t.setData({
          city: a.data.HeWeather6[0].basic.parent_city,
          location: a.data.HeWeather6[0].basic.location,
          day7Weather: o
        }),
          wx.setNavigationBarTitle({
            title: a.data.HeWeather6[0].basic.location
          }), wx.request({
            url: "https://free-api.heweather.com/s6/weather/now",
            data: {
              location: t.data.location,
              key: "ee55050ad82747be957a6827a201948b"
            },
            method: "GET",
            header: {
              "Content-Type": "application/json"
            },
            success: function (a) {
              var gray = ["阴","小雨","中雨","大雨","暴雨","雷阵雨","阵雨","中雪","大雪"]
              if (gray.includes(a.data.HeWeather6[0].now.cond_txt)){
                console.log("灰色=========")
                t.setData({
                  bgstyle:"linear-gradient(225deg,rgb(158, 158, 160),rgb(173, 173, 173),rgb(192, 192, 192),#e7e7e7);"
                });
              }else{
                console.log("蓝色=========")
                t.setData({
                  bgstyle: "linear-gradient(225deg,rgb(158, 217, 252),rgb(60, 184, 255),rgb(32, 166, 255),#416dfc);"
                });
              }
              t.setData({
                nowWeather: a.data.HeWeather6[0].now,
                updateTime: a.data.HeWeather6[0].update.loc
              }), wx.request({
                url: "https://free-api.heweather.com/s6/weather/hourly",
                data: {
                  location: t.data.location,
                  key: "ee55050ad82747be957a6827a201948b"
                },
                method: "get",
                header: {
                  "Content-Type": "application/json"
                },
                success: function (a) {
                  a.data.HeWeather6[0].hourly.forEach(function (e) {
                    e.time = e.time.substring(11, 16);
                  }), t.setData({
                    hourlyWeather: a.data.HeWeather6[0].hourly
                  }), wx.request({
                    url: "https://free-api.heweather.com/s6/air/now",
                    data: {
                      location: t.data.city,
                      key: "ee55050ad82747be957a6827a201948b"
                    },
                    method: "get",
                    header: {
                      "Content-Type": "application/json"
                    },
                    success: function (a) {
                      t.setData({
                        airQuality: a.data.HeWeather6[0].air_now_city,
                        qlty: a.data.HeWeather6[0].air_now_city.qlty
                      }), wx.request({
                        url: "https://free-api.heweather.com/s6/weather/lifestyle",
                        data: {
                          location: e,
                          key: "ee55050ad82747be957a6827a201948b"
                        },
                        method: "get",
                        header: {
                          "Content-Type": "application/json"
                        },
                        success: function (e) {
                          var a = e.data.HeWeather6[0].lifestyle;
                          a.forEach(function (e) {
                            e.type_text = t.data.lifeQuality[e.type];
                          }), t.setData({
                            lifeStyle: a
                          }), wx.hideLoading();
                        }
                      });
                    }
                  });
                }
              });
            }
          });
      },
      fail: function (e) {
        console.log(e);
      }
    });
  },
  dateToWeek: function (e) {
    var t;
    switch (new Date(e).getDay()) {
      case 0:
        t = "星期天";
        break;

      case 1:
        t = "星期一";
        break;

      case 2:
        t = "星期二";
        break;

      case 3:
        t = "星期三";
        break;

      case 4:
        t = "星期四";
        break;

      case 5:
        t = "星期五";
        break;

      case 6:
        t = "星期六";
        break;

      default:
        t = "";
    }
    return t;
  },
  showLifeStyle: function (e) {
    wx.showModal({
      title: e.currentTarget.dataset.brf,
      showCancel: !1,
      content: e.currentTarget.dataset.text,
    });
  },
  onLoad: function (e) {
    var t = this;
    wx.getLocation({
      type: "wgs84",
      success: function (e) {
        var a = e.latitude,
          o = e.longitude;
        t.getWeather(a + "," + o);
      }
    });
    wx.setNavigationBarTitle({
      title: "定位中..."
    });
  },
  search: function (t, a) {
    t && (this.setData({
      located: !1
    }), this.getWeather(t)), a && a();
  },
  init: function (t, a) {
    var e = this;
    this.setData({
      located: !0
    }), wx.getLocation({
      success: function (t) {
        e.getWeather(t.latitude + "," + t.longitude), a && a();
      },
      fail: function (t) {
        e.fail(t);
      }
    });
  },
  city: function () {
    wx.navigateTo({
      url: "chooseCity/chooseCity"
    });
  },
});