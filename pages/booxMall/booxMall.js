const { default: api } = require("../../http/api");

// pages/booxMall/booxMall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0
  },
  onChange(event) {
    wx.showToast({
      title: `切换到${event.detail.title}`,
      icon: 'none',
    });
  },
  // 点击跳转到男生小分类  
  getMinorBoys(e){
    let obj={}
    let name =e.currentTarget.dataset.item
    let male =e.currentTarget.dataset.male 
    obj.name=name
    obj.sex=male
    console.log(obj)
    wx.navigateTo({
      url: `/pages/getMinor/getMinor?obj=${JSON.stringify(obj)}`,
    })
  },
  // 点击跳转到女生小分类
  getMinorGirl(e){
    let obj={}
    let name =e.currentTarget.dataset.item
    let female =e.currentTarget.dataset.female 
    obj.name=name
    obj.sex=female
    console.log(obj)
    wx.navigateTo({
      url: `/pages/getMinor/getMinor?obj=${JSON.stringify(obj)}`,
    })
  },
  // 传参跳转排行详情
  rankInfo(e){
    let item =e.currentTarget.dataset.item
    // console.log(e)
    wx.navigateTo({
      url: `/pages/rankInfo/rankInfo?item=${JSON.stringify(item)}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 分类的请求
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '加载中~',
    })
    api.getCats().then(res =>{
      // console.log(res)
      
      this.setData({
        female:res.female, //女生
        male:res.male,     //男生
        press:res.male     //出版
      })
      wx.hideLoading()
    wx.hideNavigationBarLoading()
    }),

    // 排行的请求
    
    api.rankCategory().then(res =>{
      console.log(res)
      res.female.map(item =>{
        // 把静态资源地址 和cover 做凭借再通过image 就是需要的图片
        item.cover=`https://statics.zhuishushenqi.com`+item.cover
      })
      res.male.map(item =>{
        item.cover=`https://statics.zhuishushenqi.com`+item.cover
      })

      this.setData({
        female1:res.female.splice(0,6),   //男生 只要6个
        male1:res.male.splice(0,6)        //女生 只要6个
        
      })
      
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})