// import config from '../config.js'

// function getToken(cb) {
//   wx.login({
//     success: (res) => {
//       wx.request({
//         url: `${config.baseUrl}/member/onLogin/${res.code}/33`,
//         success: (res) => {
//           // console.log(res)
//           const response = res.data
//           const _track_ = wx.getStorageSync('_track_') || {}
//           if (response.resultCode == 1) {
//             // 缓存token openId
//             wx.setStorageSync('_token_', response.data.token);
//             // 判断用户是否绑定用户信息
//             wx.setStorageSync('_status_', response.data.status);
//             // 用于跟踪用户行为
//             wx.setStorageSync('_track_', Object.assign(_track_, {
//               openId: response.data.openId
//             }))
//             // 缓存用户手机号
//             wx.setStorageSync('_phone_', response.data.phone);
//             // 
//             wx.setStorageSync('openId', response.data.openId);
//             cb && cb();
//           }
//         }
//       })
//     }
//   })

// }

const isPhone = (value) => {
  return /(^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8})$/.test(value)
}

const isEmail = (value) => {
  return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value)
}

let _timer
const debounce = (fun, delay = 300, immediate = true) => {
  let args, context, timestamp, result
  let later = function () {
    let last = new Date().getTime() - timestamp
    if (last < delay && last >= 0) {
      _timer = setTimeout(later, delay - last)
    } else {
      _timer = null
      if (!immediate) {
        result = fun.apply(context, args)
        if (!_timer)
          context = args = null
      }
    }
  }
  return function () {
    context = this
    args = arguments
    timestamp = new Date().getTime()
    let callNow = immediate && !_timer
    if (!_timer)
      _timer = setTimeout(later, delay)
    if (callNow) {
      result = fun.apply(context, args)
      context = args = null
    }
    return result
  }
}

const sort = (value, type) => {
  if (typeof value != 'object') return []
  if (typeof value == 'object') {
    value = value._Array()
    const asce = (x, y) => {
      return x[type] - y[type]
    }
    return value.sort(asce)
  }
}

const localStorage = {
  set: function (variable, value, timer) {
    let data = {
      value: value,
      timer: timer,
      createAt: new Date().getTime()
    }
    wx.setStorageSync(variable, data)
  },
  get: function (variable) {
    let data = wx.getStorageSync(variable)
    if (data !== null) {
      if (data.createAt != null && data.createAt + data.timer <= new Date().getTime()) {
        wx.removeStorageSync(variable)
      } else {
        return data.value
      }
    }
    return null
  }
}
// 判断iPhoneX
const isIpx = () => {
  const name = 'iPhone X'
  const model = wx.getSystemInfoSync().model
  return model.indexOf(name) > -1
}
export default {
  isPhone,
  isIpx,
  isEmail,
  debounce,
  sort,
  localStorage
  // getToken
}