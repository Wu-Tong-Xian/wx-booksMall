// pages/search/search.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    change: true,
    historySearch: [],
  },
  // 搜索
  search(e) {
    // 获取搜索内容 赋值给value
    this.setData({
      value: e.detail.value
    })

    this.getSearch() //调用搜索请求
    //  //如果没有加入 搜索历史
    if (!wx.getStorageSync("historySearch")) {
      let arr = [] //自己定义一个
      //并且把点击加入的 都放在 定义的数组里面
      arr.push(this.data.value)
      wx.setStorageSync('historySearch', arr) //存起来 

    } else { //如果有存起来的 bookshelf
      //也是定义隔空数组把 bookshelf 存起来
      let arr = wx.getStorageSync("historySearch")
      //把之后点击加入的也放在 空数组里面 
      arr.push(this.data.value)
      wx.setStorageSync('historySearch', arr) //存起来 
    }
    this.setData({
      historySearch: wx.getStorageSync('historySearch')
    })
  },
  // 搜索的请求的方法
  getSearch() {
    wx.showLoading({
      title: '加载中...',
    })
    // 搜索的请求 传一个input 输入的关键字（搜索内容）
    api.bookSearch(this.data.value).then(res => {
      // console.log(res)
      wx.hideLoading()
      res.books.map(item => {
        item.cover = `https://statics.zhuishushenqi.com` + item.cover,
          item.shortIntro = item.shortIntro.slice(0, 58)
      })
      this.setData({
        books: res.books
      })
    }).catch(err => {
      wx.hideLoading()
    })
  },
  // 获取input框焦点  这个东西好像没用
  focus() {
    this.setData({
      change: false
    })
  },

  // 刷新换一换
  refresh() {
    wx.showLoading({
      title: '加载中。。。',
    })
    // 请求搜索热词
    api.hotWord().then(res => {
      let arr = []
      // 取随机颜色 用于搜索热词的随机背景颜色
      res.newHotWords.map(item => {
        // console.log(res)
        let obj = {}
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let color = "rgb(" + r + ',' + g + ',' + b + ")";
        obj.color = color
        obj.title = item
        arr.push(obj)
      })
      // 把经过加功的整个arr在赋值给了发请求拿到的这两个数组 两个都一样都有想要的数据
      this.setData({
        hotWords: arr,
        newhotWord: arr
      })
      console.log(this.data.hotWords)
      // console.log(this.data.newhotWord)
      // 随机搜索热词 让搜索热词随机显示个数
      let index = 0
      index = Math.floor(Math.random() * (this.data.hotWords.length));
      this.setData({
        hotWords: this.data.newhotWord.slice(index),
      })
      this.data.hotWords.map(item => {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let color = "rgb(" + r + ',' + g + ',' + b + ")";
        item.color = color
      })
      wx.hideLoading()
      // console.log(this.data.hotWords)
    })
  },
  // 点击搜索热搜（大家都在搜）跳转到详情
  detail(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  // 清除历史记录
  remove() {
    wx.showModal({
      title: '删除提示',
      content: '你是否要删除历史记录',
      success:(res =>{
      
        if (res.confirm) {                               
          wx.clearStorageSync('historySearch')
          this.setData({
            historySearch: wx.getStorageSync('historySearch')
          })
          wx.showToast({
            title: '以删除',
          })
        } else if (res.cancel) {
          wx.showToast({
            icon:'none' ,
            title: '已取消操作',
          })
        }
      })
    })
    
  },
  // 点击搜索历史  再次搜索点击的这一项 历史记录
  searchHistory(e) {
    console.log(e)
    this.setData({
      value: e.currentTarget.dataset.item
    })
    this.getSearch() //调用搜索请求
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refresh()
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
    this.setData({
      historySearch: wx.getStorageSync('historySearch')
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