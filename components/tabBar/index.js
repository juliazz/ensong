import { list } from './config.js'
import util from '../../utils/util.js'
export default Component({
    behaviors: [],
    properties: {
        show: {
            type: Boolean,
            value: !0
        },
        showIcon: {
            type: Boolean,
            value: !0
        },
        showText: {
            type: Boolean,
            value: !0
        },
        tabs: {
            type: Array,
            value: list
        }
    },
    data: {
        $isIpx: util.isIpx()
    },
    methods: {
        navigaTo: function(e) {
            let url = e.currentTarget.dataset.url;
            let routes = getCurrentPages()
            let _url = routes[routes.length - 1].route
            // 页面追踪 ->tab track
            // if (url == 'pages/home/home') {
               
            // }
            // if (url == 'pages/cart/cart') {
                
            // }
            // if (url == 'pages/selfCenter/selfCenter') {
               
            // }
            // if (url == 'pages/faqs/faqs') {
               
            // }

            if (url.split('?')[0] != _url) {
                wx.reLaunch({ url: `/${url}` })
            }
        }
    }
});