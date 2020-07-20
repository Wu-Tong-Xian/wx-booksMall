const {
  default: api
} = require("../../http/api")

// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    docs: [], //短评
    bookss: [], //修改或后的推荐书籍
    books: [], //推荐书籍
    active: 0,
    id: '', // 盛放几点书籍传过来的id
    detail: {}, //盛放通过id发请求拿到的详情数据
    isBookshelf: false, //用作判断是否加入书架
  },
  read(){
    wx.navigateTo({
      url: `/pages/read/read?id=${this.data.id}`,
    })
  },

  // 点击加入书架，没有请求用loc存起来
  bookshelf() {
    //  //如果没有加入 bookshelf
    if (!wx.getStorageSync("bookshelf")) {
      let arr = [] //自己定义一个
      //并且把点击加入的 都放在 定义的数组里面
      arr.push(this.data.detail)
      wx.setStorageSync('bookshelf', arr) //存起来 加入书架

    } else { //如果有存起来的 bookshelf
      //也是定义隔空数组把 bookshelf 存起来
      let arr = wx.getStorageSync("bookshelf")
      //把之后点击加入的也放在 空数组里面 
      arr.push(this.data.detail)
      wx.setStorageSync('bookshelf', arr) //存起来 加入书架

    }
    this.setData({
      isBookshelf: !this.data.isBookshelf
    }) //改变是否加入书架的状态
    // wx.setStorageSync("detail", this.data.detail )  
    // console.log(this.data.detail)
  },
  // 取消加入书架的书籍   
  removeBookshelf() {
    // 如果加入了
    if (this.data.isBookshelf) {
      let arr = wx.getStorageSync('bookshelf');
 // 用StorageSync 存起来的数组 只能通过find 跟filter 循环用map循环点击都是第一次存起来的
      let newArr = arr.filter(item => {
        return item.title !== this.data.detail.title
      })
      wx.removeStorageSync("bookshelf")
      wx.setStorageSync('bookshelf', (newArr));
    }
    this.setData({
      isBookshelf: !this.data.isBookshelf
    })
    // console.log(this.data.isBookshelf)
  },

  // // 判断是否加入书架
  judgeBookshelf() {
    if (wx.getStorageSync('bookshelf')) {
      let arr = wx.getStorageSync('bookshelf');
      // find()方法 查找相同样的并return   用map循环默认是第一项
      // filter()方法  过滤出相同样的并return   用map循环默认是第一项
      arr = arr.filter(item => {
      // arr = arr.find(item => {
     return   item.title === this.data.detail.title
      })
      console.log(arr)
      // if(arr){  //find
      if(arr.length > 0){  //feilter
        this.setData({
            isBookshelf:true
        })
      }
    }
  },


  // 点击搜索热搜（大家都在搜）跳转到详情
  detail(e) {
    let id = e.currentTarget.dataset.id
    console.log(e)
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  // 短评
  shortReviews() {
    wx.showLoading({
      title: '加载中。。。',
    })
    api.shortReviews(this.data.id).then(res => {
      wx.hideLoading()
      // console.log(res.docs)//
      res.docs.map(item => {
        item.author.avatar = 'https://statics.zhuishushenqi.com' + item.author.avatar
      })
      this.setData({
        docs: res.docs
      })
    }).catch(err => {
      wx.hideLoading()
    })
  },


  // 拿到点击书籍的所有详情信息
  getBookInfo() {
    wx.showLoading({
      title: '加载中',
    })
    api.bookInfo(this.data.id).then(res => {
      res.cover = 'https://statics.zhuishushenqi.com' + res.cover
      this.setData({
        detail: res
      })
      this.judgeBookshelf()
      console.log(this.data.detail)
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
    })
  },
  // 获取相关推荐书籍的请求方法
  relatedRecommendedBooks() {
    wx.showLoading({
      title: '加载中。。。',
    })
    api.relatedRecommendedBooks(this.data.id).then(res => {
      wx.hideLoading()
      // console.log(res) //打印 相关书籍的所有信息
      this.setData({
        books: res.books
      })
      res.books.map(item => {
        item.cover = `https://statics.zhuishushenqi.com` + item.cover
      })
      // 获取随机的相关书籍
      let index = Math.floor(Math.random() * (this.data.books.length));
      // 因为我想要显示3个 相关书籍都是20 超出3个的我可以隐藏
      // if(index < 17){
      // 截取随机的相关书籍在 赋值到bookss数组里（随机到几个就截取几个）
      this.setData({
        bookss: this.data.books.slice(index, index + 3)
      })
      // }else if(index >= 17 ){
      //   return
      // }

      // console.log(this.data.bookss) //打印赋值修改静态地址随机 后的相关书籍

    }).catch(err => {
      wx.showLoading()
    })
  },
  // 点击换一换相关书籍
  changes() {
    this.relatedRecommendedBooks()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      id: options.id
    })

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
    this.getBookInfo(), //书籍详情
      this.relatedRecommendedBooks(), //相关书籍
      this.shortReviews() //短评
    // this.judgeBookshelf()
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