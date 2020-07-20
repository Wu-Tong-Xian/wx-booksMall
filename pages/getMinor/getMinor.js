 import api from '../../http/api'
 Page({

 	/**
 	 * 页面的初始数据
 	 */
 	data: {
 		name: '', //大类名字
		 sex: '', //性别
		 minor:'',//小类名字 默认为空
 		start: 0, //从那开始 
		 type: 'hot', //id 默认id未  hot 
		 category: 0, //点击当前背景变成白色索引
		 category1: 0, //点击当前背景变成白色索引
		 books:[],
 		typeList: [{
 				id: 'hot',
 				name: '热门'
 			},
 			{
 				id: 'new',
 				name: '新书'
 			},
 			{
 				id: 'reputation',
 				name: '好评'
 			},
 			{
 				id: 'over',
 				name: '完结'
 			},
 			{
 				id: 'monthly',
 				name: 'VIP'
 			}
 		],
	 },
	 
	//  data里定义的id 点击谁就切换到谁的id
	 typeList(e){
		this.setData({
			type:e.currentTarget.dataset.type,
			category:e.currentTarget.dataset.index
		})
		this.getCatsBooks()
	 },
	 minor(e){
		 console.log(e.currentTarget.dataset.index1)
		this.setData({
			category1:e.currentTarget.dataset.index1,
			minor:e.currentTarget.dataset.item1
		})
		this.getCatsBooks()
	 },
 	//获取分类书籍  gender:性别排行(male)     type:排行类型(hot)       major:大类  
 	//  minor:小类 start:分页开始 
 	getCatsBooks() {
		 wx.showLoading({
			 title: '加载中。。。',
		 })
 		api.getCatsBooks(this.data.sex,this.data.type, this.data.name, this.data.minor, this.data.start).then(res => {
			 wx.hideLoading()
			 console.log(res)
			 res.books.map(item =>{
				 item.cover = 'https://statics.zhuishushenqi.com' +item.cover,
				 item.shortIntro= item.shortIntro.slice(0,44)
			 })
			 this.setData({
				books:res.books
			 })
 		}).catch(err =>{
			wx.hideLoading()
		 })
 	},
	 detail(e){
		let id =e.currentTarget.dataset.id
		wx.navigateTo({
			url: `/pages/detail/detail?id=${id}`,
		})
	 },
 	/**
 	 * 生命周期函数--监听页面加载
 	 */
 	onLoad: function (options) {
 		let options1 = JSON.parse(options.obj)
 		// console.log(options1)
 		// 这个方法是动态绑定名字 比如我点击玄幻 页面名字就变成玄幻（options.name）  跟 json里面的跟换名字一样  
 		wx.setNavigationBarTitle({
 			title: options1.name,
 		})
 		this.setData({
 			name: options1.name,
 			sex: options1.sex
 		})
 		this.getCatsBooks()
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
 		wx.showLoading({
 			title: '加载中~',
 		})
 		api.getMinor().then(res => {
 			// console.log(res)
 			this.setData({
 				male: res.male, //男生
 				female: res.female //女生
 			})
 			wx.hideLoading()
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