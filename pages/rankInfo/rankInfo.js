import api from '../../http/api'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		monthRank:'', //接收排行传过来的月榜id
		totalRank:'', //接收排行传过来的总榜id
		id:'', //接收排行传过来的周榜id
		id1:'', //跳转到详情页需要的id
		title:'' ,//名字
		books:[] ,// 发请求拿到的数组 用来渲染页面
		switch:0,
		// 因为定义了一个数组把周榜 月榜总榜 写死了，所以添加了id在里面一起写死
		// 通过三木表达式 写的样式跟获取的index(switch）点击改变在调用方法
		boxList:[
			{
				name: '周榜',
				id:'54d43437d47d13ff21cad58b'
      },
      {
				name: '月榜',
				id:'564d853484665f97662d0810'
      },
      {
				name: '总榜',
				id	:'564d85b6dd2bd1ec660ea8e2'
      },
    
		]
	},
	// 周榜 月榜 总榜的切换
	switch(e){
		this.setData({
			switch:e.currentTarget.dataset.index
		})
		this.getranking()
	},
	// 跳转到详情
	detail(e){
		let id1 =e.currentTarget.dataset.id
		
		wx.navigateTo({
			url: `/pages/detail/detail?id=${id1}`,
		})
	},
	// 默认请求 周榜
	getranking(){
		wx.showLoading({
			title: '加载中...',
		})
	let id = this.data.boxList[this.data.switch].id
		
		api.rankInfo(id).then(res =>{
			console.log(res)
			res.ranking.books.map(item =>{
				item.cover ='https://statics.zhuishushenqi.com' +item.cover
				item.shortIntro =item.shortIntro.slice(0,55)
			})
			this.setData({
				books:res.ranking.books
			})
			wx.hideLoading()
		}).catch(err =>{
			wx.hideLoading()
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let eachItem = 	JSON.parse(options.item)
		this.setData({
			monthRank:eachItem.monthRank ,
			totalRank:eachItem.totalRank ,
			id:eachItem._id,
			title:eachItem.title
		})
	wx.setNavigationBarTitle({
		title: this.data.title ,
	})
	// console.log(this.data.monthRank)
	// console.log(this.data.totalRank)
	// console.log(this.data.id)
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
		this.getranking()
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