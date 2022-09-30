// pages/resource/resource.js
import {getPublic } from "../../utils/axios"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oppenid: wx.getStorageSync('oppenid'),
  },
  // 跳转检索页
  search(){
    wx.navigateTo({
      url: '/pages/searching/searching',
    })
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
    getPublic({weixinId:this.data.oppenid}).then(res=>{
     if(res.users==null){
        this.setData({
            x:1
        })
     }else{
      this.setData({
          x:0
      })
     }
    })
  },
  slectLibary(){
    wx.navigateTo({
      url: '/pages/libclassify/libclassify',
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