// pages/Appointment/Appointment.js
import {GetActiveUser,baseUrl} from "../../utils/axios"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errorInfo:"", //提示信息
    reservations:[], //存放借书信息
    patronbarcode:"" ,//册条码号
    operatorAccount:"",  //读者证条码号
    oppenid: wx.getStorageSync('oppenid'),//唯一ID
    libName:""  , //图书馆名字
    libId:""   //图书馆Id
  },
  // 取消预约接口
  getCancelBooking(a,b,c){
    wx.request({
      url: baseUrl+`/i/api2/CirculationApi/Reserve?weixinId=${this.data.oppenid}&libId=${this.data.libId}&patronBarcode=${a}&itemBarcodes=${b}&style=${c}`,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success(res){
        console.log(res);
      }
    })
  },
  //取消预约
  cancelBooking(e){
    console.log(e);
    this.setData({
      patronbarcode:e.currentTarget.dataset.patronbarcode,
      operatorAccount:e.currentTarget.dataset.itembarcodes
    })
    console.log(e.currentTarget.dataset.itembarcodes);
    this.getCancelBooking(this.data.patronbarcode,this.data.operatorAccount,"delete")

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   var reservations = JSON.parse(decodeURIComponent(options.reservations))
   console.log(reservations,7777);
   this.setData({
    reservations:reservations
   })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  // 拿到用户信息
  onShow() {
    this.selectComponent("#getActivelib").getActivelib()
    GetActiveUser({weixinId:this.data.oppenid}).then(res=>{
      console.log(res);
      this.setData({
        libName:res.users[0].libName,
        libId:res.users[0].libId
      })
    })
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