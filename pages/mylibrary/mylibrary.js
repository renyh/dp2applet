// pages/mylibrary/mylibrary.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
//   绑定账户s
  jmp(){
      if(this.data.list){
        wx.navigateTo({
          url: '/pages/accManagement/accManagement',
        })
      }else{
        wx.navigateTo({
          url:'/pages/account/account'
      })
      }
     
  },
//   我的信息
 info(){
     wx.navigateTo({
       url: '/pages/myMessage/myMessage',
     })
 },
//  找回密码
 retrieveWord(){
   wx.navigateTo({
     url: '/pages/rePassword/rePassword',
   })
 },
//  获取临时密码
temporaryord(){
  wx.navigateTo({
    url: '/pages/temporaryword/temporaryword',
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      list: wx.getStorageSync('list'),
    })
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