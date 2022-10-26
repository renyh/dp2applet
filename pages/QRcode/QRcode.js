  import {GetActiveUser,GetPatronQRcode,GetBindUsers} from "../../utils/axios"
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
    libName:"",
    userName: "", //判断显示界面
    type:"", //个人类型
    x:"",
    y:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
   
  },
  slectLibary(){
    wx.navigateTo({
      url: '/pages/libclassify/libclassify',
    })
  },
// 跳转到登录页面
goLogin(){
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
 // 获取用户信息
 GetActiveUser({weixinId:this.data.oppenid,
 }).then(res=>{
  if(res.users==null){
    this.setData({
      y:1
    })
  }else{
    this.setData({
      libId:res.users[0].libId,
      patronBarcode:res.users[0].displayReaderBarcode,
      readerName:res.users[0].readerName,
      weixinId:res.users[0].weixinId,
      libName:res.users[0].libName,
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

   // 获取二维码信息
   GetPatronQRcode({
     weixinId:this.data.weixinId,
     libId:this.data.libId,
     patronBarcode:this.data.patronBarcode
   }).then(res=>{

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