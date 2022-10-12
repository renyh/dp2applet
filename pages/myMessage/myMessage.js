// pages/myMessage/myMessage.js

import {GetActiveUser,GetPatron} from "../../utils/axios"
// 引入生成二维码的文件
const qrCode =  require("../../utils/weapp-qrcode.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    libName:"",
    id:"",
    list:[],
    libid:"",//图书馆id
    patronBarcode:"",//读者整条号码
    username:"",//馆员账户名
    binduser:"",
    qrcodeUrl:"" // 二维码信息
  },
// 去待交费界面
  goPay(){
      wx.navigateTo({
        url: '/pages/Pay/Pay',
      })
  },
  here(){
   wx.navigateTo({
     url: '/pages/account/account',
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  changecode(){
    wx.navigateTo({
      url: '/pages/rePassword/rePassword',
    })
  },
  onLoad(options) {
//  修改密码

//  获取个人用户信息
  this.setData({
    id:wx.getStorageSync('oppenid'),
   
   
  })
  var that = this
  wx.getStorage({
    key: 'binduser',
    success (res) {
      that.setData({
          binduser:res.data
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
    var data = {
      weixinId:this.data.id,
    }
    GetActiveUser(data).then(res=>{
      console.log(res.users);
        this.setData({
          libid:res.users[0].libId,
          patronBarcode:res.users[0].displayReaderBarcode,
          username:res.users[0].userName,
          libName:res.users[0].libName
        })
        GetPatron({
          libid:this.data.libid,
          patronBarcode:this.data.patronBarcode,
          username:this.data.username
        }).then(res=>{
         console.log(res.obj,123);
         this.setData({
           list:res.obj,
           qrcodeUrl:res.obj.qrcodeUrl
         })
        //  生成二维码
        new qrCode("myCanvas",{
          text:this.data.qrcodeUrl,
          width:150,
          height:150,
          callback:res=>{
              this.setData({
                  codePath:res.path
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