// pages/account/account.ts
import {libclassify} from "../../utils/axios"
Page({

  /**
   * 页面的初始数据
   */
  data: {
     value1:"",
     user:"111",
     onShow:false,
     x:0,
     hiddens:["姓名（不是账户名）","证条号码","电话号码","工作人员账户"],
     lib:""||"请选择图书馆"

  },
   selecTap(){
      this.setData({
          onShow:!this.data.onShow
      })
  
   },
   opption(e){
   let Index = e.currentTarget.dataset.index
  this.setData({
      x:Index,
      onShow:!this.data.onShow
  })
   },
   skip(){
      wx.navigateTo({
        url: '/pages/libclassify/libclassify',
      })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData(
        {
            lib:options.libs
        }
    )
    console.log(this.data.lib);
  },
  //  下拉框
 
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