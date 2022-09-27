// pages/detail/dtail.js
import {
  getInfo,
  bookDetail
} from "../../utils/axios"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recpach: "",
    oppenid: wx.getStorageSync('oppenid'),
    loginUserName: "",
    loginUserType: "",
    libId: "",
    format: "table",
    list:[],
    content:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    this.setData({
      recpach:options.recpach
    })
    console.log(this.data.recpach,2222);
    getInfo({
      weixinId: this.data.oppenid
    }).then(res => {
      if (res.users[0].type == 0) {
        this.setData({
          loginUserType:"patron",
          loginUserName: res.users[0].displayReaderName

        })
      } else if (res.users[0].type == 1) {
        this.setData({
          loginUserType: "",
          loginUserName: res.users[0].userName
        })
      }
      this.setData({
        libId: res.users[0].libId
      })
      bookDetail({
        loginUserName: this.data.loginUserName,
        loginUserType: this.data.loginUserType,
        weixinId: this.data.oppenid,
        libId: this.data.libId,
        biblioPath: this.data.recpach,
        format: this.data.format,
        from:""
      }).then(res => {
        console.log(res);
        this.setData({
          list:res,
          content:res.info.replace(/img/g, "image")
        })
        console.log(this.data.content);
      })
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