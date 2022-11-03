// pages/partonInfo/partonInfo.js

import {
  GetActiveUser,
  GetPatron,
  GetBindUsers,
  GetPatronQRcode
} from "../../utils/axios"
// 引入生成二维码的文件
const qrCode = require("../../utils/weapp-qrcode.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    oppenid:"",
    libName: "",
    list: [],
    libid: "", //图书馆id
    patronBarcode: "", //读者整条号码
    username: "", //馆员账户名
    binduser: "",
    qctext: "", // 二维码信息
    reservations: [],
    type: "", //个人类型
    x: "",
    y: "", //判断
  },
  // 去待交费界面
  goPay() {
    wx.navigateTo({
      url: '/pages/Pay/Pay',
    })
  },
  // 绑定判断
  here() {
    GetBindUsers({
      weixinId: this.data.oppenid,
      containPublic: false
    }).then(res => {
      if (res.users.length) {
        wx.navigateTo({
          url: '/pages/accManagement/accManagement',
        })
      } else {
        wx.navigateTo({
          url: '/pages/account/account'
        })
      }

    })
  },
  // 去预约界面
  goAppointment() {
    var obj = JSON.stringify(this.data.reservations)
    wx.navigateTo({
      url: '/pages/Appointment/Appointment?reservations=' + encodeURIComponent(obj),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  changecode() {
    wx.navigateTo({
      url: '/pages/rePassword/rePassword',
    })
  },
  onLoad(options) {

  },
  // 选择图书馆
  slectLibary() {
    wx.navigateTo({
      url: '/pages/selectlib/selectlib',
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
    //导航栏信息
    this.selectComponent("#getActivelib").getActivelib()
  
    // 获取基本信息
    var that = this
wx.getStorage({
  key:'oppenid',
  success(res){
    console.log(res.data);
    that.setData({
      oppenid:res.data
    })
    
    GetActiveUser({
      weixinId:that.data.oppenid
    }).then(res => {
      console.log(res,9999);
      if (res.users == null) {
        that.setData({
          y: 1
        })
      } else {
        that.setData({
          libid: res.users[0].libId,
          patronBarcode: res.users[0].displayReaderBarcode,
          libName: res.users[0].libName,
          type: res.users[0].type,
          y: 0,
          username:res.users[0].userName
        })
        if (that.data.type == 0) {
          that.setData({
            x: 0,
          

          })
        } else { 
          that.setData({
            x: 1
          })
        }
    
      }
      // 获取读者防伪二维码
      GetPatronQRcode({
        weixinId: that.data.oppenid,
        libId: that.data.libid,
        patronBarcode: that.data.patronBarcode
      }).then(res => {
        that.setData({
          qctext: res.info
        })
      })
      // 获取读者信息
      GetPatron({
        libid: that.data.libid,
        patronBarcode: that.data.patronBarcode,
        username: that.data.username
      }).then(res => {
        console.log(res,99999);
        that.setData({
          list: res.obj,
          reservations: res.obj.reservations,

        })
        //  生成二维码
        new qrCode("myCanvas", {
          text: that.data.qctext,
          width: 150,
          height: 150,
          callback: res => {
            that.setData({
              codePath: res.path
            })
          }
        })
      })
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