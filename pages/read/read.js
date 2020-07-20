const {
	default: api
} = require("../../http/api")

// pages/read/read.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id: '',
		title:{}
	},
	bookChapters() {
		wx.showLoading({
			title: '白嫖？不存在的',
		})
		api.bookChapters(this.data.id).then(res => {
			wx.hideLoading()
			console.log(res)
			this.setData({title:res.chapters})
		}).catch(err =>{
			wx.hideLoading()
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		
		// 接收点击详情跳转路由传过来的id
		this.setData({
			id: options.id
		})
		this.bookChapters()
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