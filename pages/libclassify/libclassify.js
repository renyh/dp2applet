// pages/libclassify/libclassify.js
import {libclassify} from "../../utils/axios"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    list:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    libclassify().then(res=>{
        this.setData({
         arr:res
        })
        console.log(this.data.arr);
 
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
      
  },

//  选择确认图书馆
ok(e){
  console.log(e);
    let lib = e.currentTarget.dataset.lib
    this.setData({
        list:e.currentTarget.dataset.lib
    })

    wx.navigateTo({
      url: `/pages/account/account?libs=${lib}&libid=${e.currentTarget.dataset.libid}`,
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