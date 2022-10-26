// pages/mylibrary/mylibrary.ts
import {

  GetBindUsers
} from "../../utils/axios"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    binduser: [],
    oppenid: wx.getStorageSync('oppenid'),
    readerName: "", //用于导航栏左上角
    libName: "", //用于导航栏右上角
    users: [] // 判断跳转页面
  },
  slectLibary() {
    wx.navigateTo({
      url: '/pages/selectlibs/selectlibs',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
  //   绑定账户
  jmp() {
    GetBindUsers({
      weixinId: this.data.oppenid,
      containPublic: false   //不包含内置public账号
    }).then(res => {
      this.setData({
        users: res.users
      })
    })

    if (this.data.users.length) {
      wx.navigateTo({
        url: '/pages/accManagement/accManagement',
      })
    } else {
      wx.navigateTo({
        url: '/pages/account/account'
      })
    }

  },
  //   我的信息
  info() {
    wx.navigateTo({
      url: '/pages/myMessage/myMessage',
    })
  },
  //  找回密码
  retrieveWord() {
    wx.navigateTo({
      url: '/pages/rePassword/rePassword',
    })
  },
  //  获取临时密码
  temporaryord() {
    wx.navigateTo({
      url: '/pages/temporaryword/temporaryword',
    })
  },
  // 二维码
  getQcode() {
    wx.navigateTo({
      url: '/pages/QRcode/QRcode',
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
    this.selectComponent("#getActivelib").getActivelib()
   
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