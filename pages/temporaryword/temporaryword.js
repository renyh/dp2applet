// pages/temporaryword/temporaryword.js
import {
  GetActiveUser,
  bind,
  baseUrl
} from "../../utils/axios"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    libName: "", // 图书馆名字
    libNames: "" || "请选择图书馆",
    libId: '', //图书馆Id
    oppenid: wx.getStorageSync('oppenid'), //唯一Id
    userName: "",
    ipone: "",
    temcode: "",
    flag: false,
    readerName: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  // 获取输入框名字
  getName(e) {
    this.setData({
      userName: e.detail
    })
  },
  // 获取手机号
  getIphone(e) {
    this.setData({
      ipone: e.detail
    })
  },
  // 跳转到图书馆选择
  skip() {
    wx.navigateTo({
      url: '/pages/selectlib/selectlib',
    })
  },
  // 获取临时密码
  getPoCode() {
    var that = this
    wx.request({
      url: baseUrl+`/i/api2/wxuserApi/ResetPassword?weixinId=${this.data.oppenid}&libId=${this.data.libId}&name=${this.data.userName}&tel=${this.data.ipone}`,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success(res) {
        console.log(res);
        if (res.data.errorCode == 1) {
          that.setData({
            flag: true
          })
          wx.showToast({
            title: '发送成功',
          })
        } else {
          wx.showModal({
            title: "提示",
            content: res.data.errorInfo,
          })

        }

      }

    })

  },
  // 输入临时码
  getchange(e) {
    this.setData({
      temcode: e.detail.value
    })
  },
  // 绑定按钮  bind_click  todo
  bind_click() {
    bind({
      "weixinId": this.data.oppenid,
      "libId": this.data.libId,
      "bindLibraryCode": "",
      "prefix": "NB",
      "word": this.data.userName,
      "password": this.data.temcode
    }).then(res => {
      console.log(res, 123333);
      if (res.errorCode == 0) {
        console.log(res.users, 12366);
        wx.setStorageSync('list', res.users)
        wx.showToast({
          title: '绑定成功',
          icon: 'success',
          duration: 2000 //持续的时间
        })
        setTimeout(() => {
          wx.navigateTo({
            url: `../partonInfo/partonInfo`,
          })
        }, 2000)
      } else {
        wx.showModal({
          title: '提示',
          content: res.errorInfo,
        })
      }
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
    // 获取图书馆信息
    GetActiveUser({
      weixinId: this.data.oppenid
    }).then(res => {
      // 获取当前图书馆名字及id
      if (res.users != null) {
        this.setData({
          libName: res.users[0].libName,
          libNames: res.users[0].libName,
          libId: res.users[0].libId
        })
      
      }
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