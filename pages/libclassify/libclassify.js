// pages/libclassify/libclassify.js
import {GetAreaLib,GetActiveUser} from "../../utils/axios"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oppenid: wx.getStorageSync('oppenid'),   //本地oppenid
    libName:"",     //图书馆名字
    libIb:"",       //图书馆id
    libs:wx.getStorageSync('libs') || [],
    flag:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 请求图书馆名字
  onLoad(options) {
    GetAreaLib().then(res=>{
        this.setData({
         arr:res
        })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
      
  },

//  选择确认图书馆
ok(e){
    this.setData({    
        libIb:e.currentTarget.dataset.libid, 
    })
    var that = this
    wx.request({
        url: `https://demo30.ilovelibrary.cn/i/api2/wxuserApi/SetCurrentLib?&libId=${this.data.libIb}&weixinId=${this.data.oppenid}`,
        header: {
            "Content-Type":"application/x-www-form-urlencoded"
        },
        method: "POST",
        success(res){
            if(res.data.errorCode==0){
              GetActiveUser({weixinId:that.data.oppenid}).then(res=>{
                that.setData({
                  libName:res.users[0].libName,
                })
            })   
                wx.navigateBack({
                  delta: 0,
                })
            }
        }
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