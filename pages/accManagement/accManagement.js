// pages/accManagement/accManagement.js
import {getInfo} from "../../utils/axios"
Page({

  /**
   * 页面的初始数据
   */
  data: {
   list:[],
   bindUserid:"",  //解绑id
   oppenid: wx.getStorageSync('oppenid'),
   libName:"",   //图书馆名字
   displayReaderName:"" , //证条号码
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    getInfo({weixinId:this.data.oppenid,
      containPublic:true
    }).then(res=>{
      console.log(res);
      this.setData({
        displayReaderName:res.users[0].displayReaderName,
        libName:res.users[0].libName,
        bindUserid:res.users[0].id
      })
      wx.setStorageSync("ReaderName", this.data.displayReaderName)
    })
  },
  // 去主页
  goHome(){
    wx.switchTab({
      url: '/pages/resource/resource',
    })
  },
  unbundle(){
      
// 发请求解绑
    console.log(this.data.bindUserid,12);
   wx.request({
     url: `https://demo30.ilovelibrary.cn/i/api2/wxuserApi/Unbind?bindUserId=${this.data.bindUserid}`,
     method:"DELETE",
     success(res){
         console.log(res.data);
         if(res.data.errorCode==0){
            wx.showToast({
                title: '解绑成功',    
                icon: 'success',  
                duration: 2000//持续的时间
              })
              wx.removeStorage({
                key: 'list',
                success (res) {
                  console.log(res)
                }
              })
              setTimeout(()=>{
                  wx.redirectTo({
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