// pages/bookshelf/bookshelf.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    bookshelf: []
  },
  // 帮助页面
  gohelp() {
    wx: wx.navigateTo({
      url: '/pages/help/help',

    })
  },

  read(e) {
    console.log(e)
    this.setData({
      id: e.currentTarget.dataset.id
    })
    wx.navigateTo({
      url: `/pages/read/read?id=${this.data.id}`,
    })

  },
  // 长安图片删除
  del(e) {
    let id = e.currentTarget.dataset.id

    let arr = wx.getStorageSync('bookshelf');
    // 用StorageSync 存起来的数组 只能通过find 跟filter 循环用map循环点击都是第一次存起来的
    let newArr = arr.filter(item => {
      return item._id !== id
    })
    wx.setStorageSync('bookshelf', (newArr));
    this.setData({
      bookshelf: newArr
    })
    wx.showToast({
      icon: 'none',
      title: '以删除',
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
    // 获取加入书架的书籍
    let bookshelf = wx.getStorageSync("bookshelf");
    this.setData({
      bookshelf: bookshelf
    })
    console.log(this.data.bookshelf)
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