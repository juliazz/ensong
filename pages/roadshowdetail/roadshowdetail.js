//index.js
//获取应用实例
const app = getApp()

Page('roadshowdetail/roadshowdetail',{
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
   console.log(options);
   wx.setNavigationBarTitle({ title: `路演${options.showid}` })  
  },
  onShow: function name(params) {

  },
  
})
