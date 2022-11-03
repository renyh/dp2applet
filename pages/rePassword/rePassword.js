// pages/rePassword/rePassword.js
import {baseUrl,GetActiveUser} from "../../utils/axios"

Page({ 
  /**
   * 页面的初始数据
   */
  data: {
    flag:false,
    libId:'',  //图书馆Id
    libName:"", // 图书馆名字
    oppenid: wx.getStorageSync('oppenid'), //唯一Id
    userName:'' , // 姓名
    ipone:'' ,//手机号
    oldCode:"", //临时密码
    newCode:"", //新密码
    CardId:"", //读者证条号码
    readerName:""
  },
      // 获取临时密码

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
   
  },

  // 获取读者证条号码
  getCardId(e){
    this.setData({
      CardId:e.detail
    })
  },
  // 获取临时密码
  getoldCode(e){
    this.setData({
      oldCode:e.detail
    })
  },
  // 获取新密码
  getNewCode(e){
    console.log(e.detail);
    this.setData({
      newCode:e.detail
    })
  },
  // 修改密码
  amendCode(){
    wx.request({
      url:  baseUrl+`/i/api2/wxuserApi/ChangePassword?&libId=${this.data.libId}&patron=${this.data.CardId}&oldPassword=${this.data.oldCode}&newPassword=${this.data.newCode}`,
      header:{
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method:"POST",
      success(res){
        console.log(res.data);
        if(res.data.errorCode==1){
          wx.showToast({
            title: '修改成功',
          })
          wx.removeStorage({
            key: 'list',
            success (res) {
              console.log(res)
            }
          })
          setTimeout(()=>{
            wx.navigateTo({
              url: '/pages/account/account',
            })
            },2000)
        }else{
          wx.showModal({
            title:"提示",
            content: res.data.errorInfo,
          })
        }
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
 // 获取图书馆信息
 this.selectComponent("#getActivelib").getActivelib()
 GetActiveUser({weixinId: this.data.oppenid}).then(res=>{
   this.setData({
     libId:res.users[0].libId
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