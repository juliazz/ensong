//collection.js
//获取应用实例
const app = getApp()

Page('collection/collection',{
  data: {
    collectionData: [{
      name: '一阳指',
      time: '2019-01-01',
      state: 1,
      message: '刘奶奶找牛奶奶买牛奶，牛奶奶给刘奶奶拿牛奶，刘奶奶说牛奶奶的牛奶不如柳奶奶的牛奶，牛奶奶说柳奶奶的牛奶会流奶，柳奶奶听见了大骂牛奶奶你的才会流奶，柳奶奶和牛奶奶泼牛奶吓坏了刘奶奶，大骂再也不买柳奶奶和牛奶奶的牛奶',
      collectstate: 1
    }, {
      name: '斗转星移',
      time: '2018-01-01',
      state: 1,
      message: '打南边来了个喇嘛，手里提拉着五斤鳎(tǎ) 目。打北边来了个哑巴，腰里别着个喇叭。南边提拉着鳎目的喇嘛要拿鳎目换北边别喇叭哑巴的喇叭。哑巴不愿意拿喇叭换喇嘛的鳎目，喇嘛非要换别喇叭哑巴的喇叭。喇嘛抡起鳎目抽了别喇叭哑巴一鳎目，哑巴摘下喇叭打了提拉着鳎目的喇嘛一喇叭。',
      collectstate: 0
    }, {
      name: '润木保湿',
      time: '2018-11-30',
      state: 2,
      message: '像雾像雨又像风普通一点项目简介八百标兵奔北坡',
      collectstate: 1
    }, {
        name: '润木宝石',
      time: '2018-11-30',
      state: 1,
      message: '刘奶奶找牛奶奶买牛奶，牛奶奶给刘奶奶拿牛奶，刘奶奶说牛奶奶的牛奶不如柳奶奶的牛奶，牛奶奶说柳奶奶的牛奶会流奶，柳奶奶听见了大骂牛奶奶你的才会流奶，柳奶奶和牛奶奶泼牛奶吓坏了刘奶奶，大骂再也不买柳奶奶和牛奶奶的牛奶',
      collectstate: 1
    }, {
        name: '一阳指',
      time: '2018-11-30',
      state: 1,
      message: '像雾像雨又像风普通一点项目简介',
      collectstate: 1
    }, {
      name: '项目6',
      time: '2018-11-30',
      state: 2,
      message: '像雾像雨又像风普通一点项目简介',
      collectstate: 1
    }
    ]
  },
  // 改变收藏状态
  changeCollection: function name(params) {
    const index = params.currentTarget.dataset.index;
    const collectionData = this.data.collectionData
    collectionData[index].collectstate = !collectionData[index].collectstate
    this.setData({
      collectionData
    })

  },
  clickDownLoad:function name(params) {
    console.log(`第${params.currentTarget.dataset.index}条点击下载`);
    
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

  },
  onShow: function name(params) {
    this.changeCollectionData()
    
  },
  changeCollectionData:function name(params) {
    const collectionData = this.data.collectionData
    collectionData.map(item=>{
      switch (item.state) {
        case 0:
          item.stateWord='未开始';
          item.stateClass='unStart'

          break;
        case 1:
          item.stateWord='进行中'
          item.stateClass = 'pending'
          break;
        case 2:
          item.stateWord='已结束'
          item.stateClass = 'end'
          break;
      
      }
      this.setData({collectionData})

    })
  }

 
})
