const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  isEmptyObject: function (t) {
    for (var e in t) return !1;
    return !0;
  },
  cmpVersion: function (e, r) {
    if ((void 0 === e ? "undefined" : t(e)) + (void 0 === r ? "undefined" : t(r)) !== "stringstring") return !1;
    for (var n = e.split("."), o = r.split("."), s = 0, i = Math.max(n.length, o.length); s < i; s++) {
      if (n[s] && !o[s] && parseInt(n[s]) > 0 || parseInt(n[s]) > parseInt(o[s])) return 1;
      if (o[s] && !n[s] && parseInt(o[s]) > 0 || parseInt(n[s]) < parseInt(o[s])) return -1;
    }
    return 0;
  }
}
