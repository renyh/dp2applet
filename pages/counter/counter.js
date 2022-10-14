// pages/counter/counter.js
import { GetActiveUser,bind} from "../../utils/axios"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oppenid: wx.getStorageSync('oppenid'), //唯一Id
    libName:"",  //图书馆名字
    scanCode:"", //扫描结果
    bindLibraryCode:"",
    libId:""   ,//图书馆Id
    readerName:""  //左上角
  },
  skip() {
    wx.navigateTo({
        url: '/pages/libclassify/libclassify',
    })
},
// 扫码并绑定
getCode(){
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,// 只允许从相机扫码
      success(res){
          console.log(that.data.oppenid,555);
          var data = {
            weixinId:that.data.oppenid,
            prefix:"PQR",
            word:res.result.slice(4),
            password:"",
            libId:that.data.libId,
            bindLibraryCode:that.data.bindLibraryCode
          }
          
         // 扫码成功后  在此处理接下来的逻辑
           bind(data).then(res=>{
               console.log(res);
               if(res.errorCode==-1){
                   wx.showModal({
                    title: '提示',
                    content: res.errorInfo+data.word,
                    success (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                   })
               }else{
                wx.showToast({
                    title: '绑定成功',
                    icon: 'success',
                    duration: 2000 //持续的时间
                })
                wx.setStorage({
                    key: "binduser",
                    data: res.users
                }) //todo  binduser
                setTimeout(() => {
                    wx.navigateTo({
                        url: `../accManagement/accManagement`,
                    })
                }, 2000)
               }
        })
      }
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    
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
    GetActiveUser({
        weixinId: this.data.oppenid
      }).then(res=>{
        if(res.users[0].userName){
            this.setData({
              readerName:res.users[0].userName,   
            })
          }else{
            this.setData({
              readerName:res.users[0].displayReaderName,
            })
          }
        this.setData({
          libName:res.users[0].libName,
          bindLibraryCode:res.users[0].libraryCode,
          libId:res.users[0].libId, 
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