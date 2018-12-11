import utils from './util.js'
import tabBar from '../components/tabBar/setTabBar.js'
/**
 * 扩展数值类型
 */


Object.defineProperty(Number.prototype, '_Currency', {
    writable: false,
    enumerable: false,
    configurable: true,
    value: function() {
        let result
        if (this) {
            result = (this.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
        }
        if (!this) {
            result = '0.00'
        }
        return '￥' + result
    }
})


/**
 * 扩展字符类型
 */
Object.defineProperty(String.prototype, '_Currency', {
    writable: false,
    enumerable: false,
    configurable: true,
    value: function() {
        let value = this
        if (isNaN(value)) return value
        return parseFloat(value)._Currency()
    }
})
Object.defineProperty(String.prototype, '_Json', {
    writable: false,
    enumerable: false,
    configurable: true,
    value: function() {
        let value = this
        try { return JSON.parse(value) } catch (e) {
            // console.error('JSON parse error', e)
            return value
        }
    }
})


/**
 * 扩展对象类型
 */
Object.defineProperty(Object.prototype, '_Array', {
    writable: false,
    enumerable: false,
    configurable: true,
    value: function() {
        let value = this
        let result = Object.keys(value).map(function(item) {
            return {
                key: item,
                ...value[item]
            }
        })
        return result
    }
})

/**
 * wx对象下的所有非同步方法promise化
 * 对应原方法名前加$符号
 * 如 wx.request ==> wx.$request
 */

for (let key in wx) {
    let _fun = wx[key]
    if (key.indexOf('Sync') < 0 && typeof _fun === 'function' && Object.prototype.toString.call(_fun) === '[object Function]')
        wx['$' + key] = (options, ...params) => {
            return new Promise((resolve, reject) => {
                _fun(Object.assign({}, options, { success: resolve, fail: reject }), ...params)
            })
        }
}


/**
 * 扩展Page注册
 */

let OriginPage = Page,
    onPreLoads = {},
    preLoadData = {},
    hooks = ['onLoad', 'onShow', 'onReady', 'onHide', 'onUnload']

class NewPage {
   
    constructor(path, options) {
      
        let hookArray = {}

        const _dealHook = (options) => {
            for (let key in hooks) {
                let value = hooks[key]
                if (options[value]) {
                    if (hookArray[value]) hookArray[value].push(options[v])
                    else hookArray[value] = [options[value]]
                    delete options[value]
                }
            }
        }

        _dealHook(options)
        for (let hook in hookArray) {
            options[hook] = function() {
                // 添加加生命周期函数的后置全局统一处理
                switch (hook) {
                    case 'onLoad':
                        
                        break
                    case 'onShow':
                        this.setData({
                            $tabs: tabBar.setActive(this.__route__)
                        })
                        break
                    case 'onHide':
                        break
                    case 'onUnload':
                        break
                }

                hookArray[hook].map(item => {
                    item.apply(this, arguments)
                })
            }
        }

        options.$key = path
        onPreLoads[path] = options['onPreLoad']

        options.$showLoading = this.showLoading
        options.$hideLoading = this.hideLoading
        options.$showToast = this.showToast
        options.$hideToast = this.hideToast

        options.$go = this.go
        options.$to = this.to
        options.$get = this.getPreData
        options.$set = this.setPreData

        return OriginPage(options)
    }
    showLoading(options = {}) {
        // console.log(this.data)
        try {
            this.data.$loadingEl.show(options)
        } catch (err) {
            throw new Error('Uninitialized components.')
        }
    }
    hideLoading() {
        try {
            this.data.$loadingEl.hide()
        } catch (err) {
            throw new Error('Uninitialized components.')
        }
    }
    showToast(options = {}) {
        try {
            this.data.$toastEl.show(options)
        } catch (err) {
            throw new Error('Uninitialized components.')
        }
    }
    hideToast() {
        try {
            this.data.$toastEl.hide()
        } catch (err) {
            throw new Error('Uninitialized components.')
        }
    }
    go(event) {
        let path = event.currentTarget.dataset.path
        let type = event.currentTarget.dataset.type || 'navigate'
        this.$to(path, type)
    }
    to(path, type = 'navigate') {
        // 使手机发生较短时间的振动
        wx.vibrateShort()

        let routes = getCurrentPages(),
            refer = routes[routes.length - 1].route,
            tabBars = [],
            isTab = !1,
            route = path.split('?')[0],
            query = path.split('?')[1],
            key = `pages/${route}`,
            params = query,
            data = {}

        if (params) {
            params.split('&').forEach(item => {
                let key = item.split('=')[0],
                    value = item.split('=')[1]
                data[key] = value
            })
        }

      

        const success = () => {
            // console.log(`<-------------- ${type} to '${path}' success-------------->`)
        }
        const fail = () => {
            // console.log(`<-------------- ${type} to '${path}' fail-------------->`)
        }
        const preLoad = () => {
            if (onPreLoads[route]) {
                onPreLoads[route].call(this, data)
            }
        }

        // 判断是否切换tab页面
        isTab = tabBars.findIndex(t => t.pagePath === pagePath) > -1

        if (isTab) {
            type = 'switchTab'
        }

        switch (type) {
            case 'navigate':
                let _idx = routes.findIndex(item => item.$key == key)
                if (_idx > -1) {
                    type = ''
                    wx.navigateBack({ delta: routes.length - _idx - 1 })
                } else {
                    preLoad()
                    if (routes.length > 8) {
                        type = '$redirectTo'
                    } else {
                        type = '$navigateTo'
                    }
                }
                break
            case 'redirect':
                preLoad()
                type = '$redirectTo'
                break
            case 'switchTab':
                type = '$switchTab'
                break
            case 'reLaunch':
                preLoad()
                type = '$reLaunch'
                break
            case 'navigateBack':
                type = ''
                wx.navigateBack({ delta: 1 })
                break
        }
        if (type) {
            utils.debounce(function() {
                wx[type]({ url: `/pages/${path}` }).then(success).catch(fail)
            }, 300)()
        }

        // console.log('routes:', getCurrentPages())

    }
    getPreData(key) {
        return preLoadData[key] || Promise.resolve('')
    }
    setPreData(key, value) {
        preLoadData[key] = value
    }
}

export default {
    OriginPage,
    NewPage
}