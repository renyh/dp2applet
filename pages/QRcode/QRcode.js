  import {GetActiveUser,GetPatronQRcode} from "../../utils/axios"
  const qrCode =  require("../../utils/weapp-qrcode.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oppenid: wx.getStorageSync('oppenid'),
    weixinId:"",
    libId:"",         //图书馆id,
    patronBarcode:"", //读者证条码号
    info:'',  //二维码信息
    readerName:"",  //读者姓名
    binduser:[]  , //判断页面
    libName:"",
    userName: "", //判断显示界面
    type:"", //个人类型
    x:"",
    readerName:""//左上角显示

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取本地存储信息
    this.setData({
        binduser:wx.getStorageSync('binduser')
    })
   
  },
// 跳转到登录页面
goLogin(){
  wx.navigateTo({
    url: '/pages/account/account',
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
 // 获取用户信息
 GetActiveUser({weixinId:this.data.oppenid,
      
 }).then(res=>{
     console.log(res);
   this.setData({
     libId:res.users[0].libId,
     patronBarcode:res.users[0].displayReaderBarcode,
     readerName:res.users[0].readerName,
     weixinId:res.users[0].weixinId,
     libName:res.users[0].libName,
     userName: res.users[0].userName,
     type: res.users[0].type
   })
   if (!this.data.userName&&this.data.binduser.length&&this.data.type=="0") {
    this.setData({
      x: 0
    })
  } else { //说明为public，未绑定读者账号
    this.setData({
      x: 1
    })
  } 
  console.log(this.data.x);
  if(res.users[0].userName){
    this.setData({
      readerName:res.users[0].userName,   
    })
  }else{
    this.setData({
      readerName:res.users[0].displayReaderName,
    })
  }
   // 获取二维码信息
   GetPatronQRcode({
     weixinId:this.data.weixinId,
     libId:this.data.libId,
     patronBarcode:this.data.patronBarcode
   }).then(res=>{
     console.log(res,12333);
     this.setData({
       info:res.info
     })
     // 生成二维码
     new qrCode("myCanvas",{
       text:this.data.info,
       width:200,
       height:200,
       padding:12,
       callback:res=>{
           console.log(res.path,44444);
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