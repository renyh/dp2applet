// pages/myMessage/myMessage.js

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
    oppenid: wx.getStorageSync('oppenid'),
    libName: "",
    id: "",
    list: [],
    libid: "", //图书馆id
    patronBarcode: "", //读者整条号码
    username: "", //馆员账户名
    binduser: "",
    qrcodeUrl: "", // 二维码信息
    reservations: [],
    userName: "", //判断显示界面
    type:"", //个人类型
    x:"",
    y:"",   //判断
    readerName:""//左上角显示
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
      weixinId:this.data.oppenid,
      containPublic:false
    }).then(res=>{
      if(res.users.length){
        wx.navigateTo({
          url: '/pages/accManagement/accManagement',
        })
      }else{
        wx.navigateTo({
          url:'/pages/account/account'
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
    //  获取个人用户信息





  },
  // 选择图书馆
  slectLibary(){
    wx.navigateTo({
      url: '/pages/libclassify/libclassify',
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
    var data = {
      weixinId: this.data.id,
    }
    GetActiveUser(data).then(res => {
      if(res.users==null){
        this.setData({
          y:1
        })
      }else{
        this.setData({
          libid: res.users[0].libId,
          patronBarcode: res.users[0].displayReaderBarcode,
          username: res.users[0].userName,
          libName: res.users[0].libName,
          userName: res.users[0].userName,
          type: res.users[0].type,
          y:0
        })
        if (this.data.type=="0") {
          this.setData({
            x: 0
          })
        } else { //说明为public，未绑定读者账号
          this.setData({
            x: 1
          })
        } 
      }
      GetPatronQRcode({
          weixinId:this.data.oppenid,
          libId:this.data.libid,
          patronBarcode:this.data.patronBarcode
      }).then(res=>{
        this.setData({
          qrcodeUrl: res.info
        })
      })
      GetPatron({
        libid: this.data.libid,
        patronBarcode: this.data.patronBarcode,
        username: this.data.username
      }).then(res => {
        this.setData({
          list: res.obj,
          reservations: res.obj.reservations,
          
        })
        //  生成二维码
        new qrCode("myCanvas", {
          text: this.data.qrcodeUrl,
          width: 150,
          height: 150,
          callback: res => {
            this.setData({
              codePath: res.path
            })
          }
        })
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