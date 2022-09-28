// pages/advancedSearch/advancedSearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onShow:false,
    hiddens:["全部","书名","ISBN","作者","主题词","分类号","出版时间","出版社"],
    x:0,
    item:"",
    list:["前方一致","中间一致","后方一致","精确一致"],
    Show:false,
    y:0,
    value:"",
    from:["title,ISBN,contributor,subject,clc,_class,publishtime,publisher","title","ISBN","contributor","subject","clc","_class,publishtime","publisher"],
    match:["left","middle","right","exact"]
  },
  inputOne(){
    this.setData({
      onShow:!this.data.onShow
    })
  },
  inputTwo(){
    this.setData({
      Show:!this.data.Show
    })
  },
  opption(e) {
    console.log(e);
    let Index = e.currentTarget.dataset.index
    this.setData({
        x: Index,
        onShow: !this.data.onShow,
    })
},
getlist(e){
  let Index = e.currentTarget.dataset.index
  this.setData({
      y: Index,
      Show: !this.data.Show,
  })
},
// 跳搜索页
simpleSearch(){
  wx.navigateTo({
    url: '/pages/searching/searching',
  })
},
// 检测输入框内容
searchChange(e){
console.log(e.detail.value);
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})