// pages/accManagement/accManagement.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
   list:[],
   bindUserid:"",
   oppenid: wx.getStorageSync('oppenid')||"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  
  },
  unbundle(){
      this.setData({
        bindUserid:this.data.list[0].id
      })
// 发请求解绑
    console.log(this.data.bindUserid,12);
   wx.request({
     url: `https://demo30.ilovelibrary.cn/i/api2/wxuserApi/Unbind?bindUserId=${this.data.bindUserid}`,
     method:"DELETE",
     success(res){
         console.log(res.data);
         if(res.data.errorCode==0){
            wx.clearStorage("list") 
            wx.clearStorageSync("oppenid")
            wx.showToast({
                title: '解绑成功',    
                icon: 'success',  
                duration: 2000//持续的时间
              })
              setTimeout(()=>{
                  wx.navigateTo({
                    url: '/pages/account/account',
                  })
              },2000)
         }else{
            wx.showToast({
                title: '账号未找到',    
                icon: 'error',  
                duration: 2000//持续的时间
              })
         }
     }
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