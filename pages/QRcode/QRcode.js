  import {getInfo,getQRcode} from "../../utils/axios"
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
    readerName:""  //读者姓名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    getInfo({weixinId:this.data.oppenid}).then(res=>{
        console.log(res);
      this.setData({
        libId:res.users[0].libId,
        patronBarcode:res.users[0].displayReaderBarcode,
        readerName:res.users[0].readerName,
        weixinId:res.users[0].weixinId
      })
      getQRcode({
        weixinId:this.data.weixinId,
        libId:this.data.libId,
        patronBarcode:this.data.patronBarcode
      }).then(res=>{
        console.log(res,12333);
        this.setData({
          info:res.info
        })
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