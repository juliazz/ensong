//programdetail.js
//获取应用实例
const app = getApp()

Page('index/index',{
  data: {
   programInfo:{
     state:0,
     about:'项目概况项目概况项目概况项目概况项目概况项目概况',
     detail:'项目细节此处是项目细节，项目细节此处是项目细节，项目细节此处是项目细节，项目细节此处是项目细节，'
   }
  },
  onShow: function () {

  },

  onLoad: function () {

  },
  changeCollection:function name(params) {
    const programInfo = this.data.programInfo
    programInfo.state = !programInfo.state
    this.setData({
      programInfo
    })
    console.log(this.data.programInfo);
    
  },

  /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
      return {
        title: '恩颂demo',
        path: `/pages/index/index?`,
        
        success: (res) => {
          console.log('分享成功')
        },
        fail: (res) => {
          console.log('分享失败')
        }
      }

  }
})
