import React from 'react'
import {Linking, Dimensions} from 'react-native'
import moment from 'moment'
require('moment/locale/zh-cn.js')
const colors = ['#E74C3C', '#C0392B', '#1ABC9C',
  '#16A085', '#2ECC71', '#27AE60', '#3498DB',
  '#2980B9', '#9B59B6', '#8E44AD', '#34495E',
  '#2C3E50', '#E67E22',
  '#D35400', '#7F8C8D']

function getRandomNum (Min, Max) {
  var Range = Max - Min
  var Rand = Math.random()
  return (Min + Math.round(Rand * Range))
}

export function parseImgUrl (url) {
  if (/^\/\/.*/.test(url)) {
    url = 'http:' + url
  }
  return url
}

export function genColor () {
  return colors[getRandomNum(0, colors.length - 1)]
}

export function link (url) {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      return Linking.openURL(url)
    }
  })
    .catch(err => {
      console.error('An error occurred', err)
    })
}
export function toDecimal2 (x) { // 格式化
  let f = parseFloat(x)
  if (isNaN(f)) {
    return '0.00'
  }
  let g = Math.round(x * 100) / 100
  let s = g.toString()
  let rs = s.indexOf('.')
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + 2) {
    s += '0'
  }
  return s
}
export function MillisecondToTime (msd) {
  let s = parseInt(msd % 60)
  var m = parseInt(msd / 60)
  return m + ':' + s
}
export function formatTenThousand (v, bit = 0) {
  if (v < 10000) {
    return v
  } else if (v >= 10000) {
    let rv = (v / 10000)
    let s = rv.toString()
    if (s.indexOf('.') < 0) {
      return rv + '万'
    } else {
      return rv.toFixed(bit) + '万'
    }
  } else if (v >= 100000000) {
    let rv = (v / 100000000)
    let s = rv.toString()
    if (s.indexOf('.') < 0) {
      return rv + '亿'
    } else {
      return rv.toFixed(bit) + '亿'
    }
  }
}

export function isNum (v) {
  if (!!v && v.indexOf('.') > -1) {
    let fv = v.substring(v.indexOf('.') + 1)
    if (fv.length > 0) {
      if (fv.length > 2) {
        return v.substring(0, v.indexOf('.') + 3)
      }
      let t = v.substring(0, v.indexOf('.'))
      if (!/[\d]{1,2}/.test(fv)) {
        if (isNaN(parseInt(t))) {
          return '0.'
        }
        return t + '.'
      }
      if (!/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(v)) {
        return toDecimal2(v)
      }
    }
    return parseFloat(v)
  }
  return v.replace(/[^\d]/g, '')
  // if(/^d*(?:.d{0,2})?$/.test(v)){
  // 	return v;
  // }
  // return '0.00';
  // if(!!v){
  // 	return v == 0 || new RegExp('^[1-9]{1}[0-9]{0,8}$|^[1-9]{1}[0-9]{0,8}\\.[0-9]{1,2}$|^0\\.[0-9]{1,2}$').test(v);
  // }
  // return false;
}

export function getLength (str) {
  return str.replace('/[^\x00-\xff]/g', 'aa').length
}

export function getTimeStr (msgDate) {
  let tpInt = parseInt(msgDate.getTime())
  let tp = new Date(tpInt)
  let now = new Date()
  let nowInt = now.getTime()

  let hour = tp.getHours()
  let minute = tp.getMinutes()
  let hmstr = ' '
  if (hour < 10) {
    hmstr += '0'
  }
  hmstr += hour + ':'
  if (minute < 10) {
    hmstr += '0'
  }
  hmstr += minute
  let result = ''
  let onedayTimeIntervalValue = 24 * 60 * 60 * 1000
  let gapTime = nowInt - tpInt
  if (gapTime < onedayTimeIntervalValue * 3 && gapTime > 0) {
    if (gapTime <= onedayTimeIntervalValue) {
      var isSameDay = tp.getDay() === now.getDay()
      result = isSameDay ? result + hmstr
        : '昨天' + result + hmstr
    } else if (gapTime <= onedayTimeIntervalValue * 2) {
      result = '昨天 ' + result + hmstr
    } else if (gapTime <= onedayTimeIntervalValue * 3) {
      result = '前天 ' + result + hmstr
    }
  } else if (gapTime <= onedayTimeIntervalValue * 7 && gapTime > 0) {
    switch (tp.getDay()) {
      case 0:
        result = '星期日'
        break
      case 1:
        result = '星期一'
        break
      case 2:
        result = '星期二'
        break
      case 3:
        result = '星期三'
        break
      case 4:
        result = '星期四'
        break
      case 5:
        result = '星期五'
        break
      case 6:
        result = '星期六'
        break
    }
    result = result + hmstr
  } else {
    // result =showDetail?Format(tp,'yyyy-MM-dd hh:mm'): Format(tp,'yyyy/MM/dd')
    result = Format(now, 'yyyy-MM-dd hh:mm')
  }
  return result
}

function Format (date, fmt) { // author: meizz
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
