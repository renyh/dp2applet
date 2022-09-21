// pages/accManagement/accManagement.js
import {getunbundle} from "../../utils/delete"
Page({

  /**
   * 页面的初始数据
   */
  data: {
   list:[],
   bindUserid:""
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
      var data
      data={
        bindUserId:this.data.bindUserid
      }
      getunbundle(
      
      ).then(res=>{
        console.log(getunbundle);
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