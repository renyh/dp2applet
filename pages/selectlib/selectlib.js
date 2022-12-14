// pages/selectlibs/selectlibs.js
import {
  GetAreaLib,
  baseUrl
} from "../../utils/axios"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oppenid: wx.getStorageSync('oppenid'), //本地oppenid
    libName: "", //图书馆名字
    libIb: "", //图书馆id
    libarys: [], //图书馆
    libraryCode: "", //分管信息
    flag:true ,  //todo
    name:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 请求图书馆名字
  onLoad(options) {
  
     // 
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
     
  },
  radioChange(e) {

  },

  //  选择确认图书馆
  ok(e) {
    this.setData({
      libIb: e.currentTarget.dataset.libid,
      libraryCode: e.currentTarget.dataset.branchedpassage,
      libName:e.currentTarget.dataset.name
    })
    wx.setStorageSync('key', e.currentTarget.dataset.name)
    
    wx.request({
        url: baseUrl+`/i/api2/wxuserApi/SetCurrentLib?&weixinId=${this.data.oppenid}&libId=${this.data.libIb}~${this.data.libraryCode}`,
        header: {
            "Content-Type":"application/x-www-form-urlencoded"
        },
        method: "POST",
        success(res){
          // 返回上一级使用微信小程序自带功能  todo
            if(res.data.errorCode==0){
                wx.navigateBack({
                  delta: 0,
                })
            }

        }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      libName:wx.getStorageSync('key')
    })
    this.selectComponent("#getActivelib").getActivelib()
    GetAreaLib().then(res => {
      res.forEach(item=>{
        item.libs.forEach(items=>{
          items.flag=false
        })
      })
      this.setData({
        libarys: res,
      }) 
      this.data.libarys.forEach(item=>{
        item.libs.forEach(items=>{
          console.log(this.data.libName);
       if(this.data.libName==items.name){
         console.log(this.data.libName);
         items.flag=true
       }
       this.setData({
         libarys: this.data.libarys
       })
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