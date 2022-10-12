// pages/detail/dtail.js
import {
  GetActiveUser,
  GetBiblio,
  getItems,
  Reserveh
} from "../../utils/axios"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recpach: "",  //接受跳转过来的书目路径
    oppenid: wx.getStorageSync('oppenid'),
    loginUserName: "",
    loginUserType: "",
    libId: "",
    displayReaderBarcode:"",  //读者证条码号
    itemBarcodes:"",   //册条码号
    format: "table",
    binduser:[],
    jsonItem:[], //转化
    images:[],  //图片管理
    books:[],//册信息
    userName:"" //判断是否为读者
  },
  // 跳转到绑定账户界面
  goBound(){
    wx.navigateTo({
      url: '/pages/account/account',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      recpach:options.recpach,
      binduser:wx.getStorageSync('binduser')
    })


   
  },
  //点击进行图书预约
  getSubscribe(){
    wx.request({
      url: `http://demo30.ilovelibrary.cn/i/api2/CirculationApi/Reserve?weixinId=${this.data.oppenid}&libId=${this.data.libId}&patronBarcode=${this.data.displayReaderBarcode}&itemBarcodes=${this.data.itemBarcodes}&style=new`,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success(res){
        console.log(res);
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
    // 获取详情
    GetActiveUser({
      weixinId: this.data.oppenid,
    }).then(res => {
      console.log(res,666666);
      if (res.users[0].type == 0) {
        this.setData({
          loginUserType:"patron",
          loginUserName: res.users[0].displayReaderName,
          displayReaderBarcode:res.users[0].displayReaderBarcode
        })
      } else if (res.users[0].type == 1) {
        this.setData({
          loginUserType: "",
          loginUserName: res.users[0].userName
        })
      }
      this.setData({
        libId: res.users[0].libId
      })
      GetBiblio({
        loginUserName: this.data.loginUserName,
        loginUserType: this.data.loginUserType,
        weixinId: this.data.oppenid,
        libId: this.data.libId,
        biblioPath: this.data.recpach,
      }).then(res => {
        console.log(res,1111);
        res.info=res.info.replace(/@/g,'')
        var info1 = JSON.parse(res.info)
        console.log(info1);
        var info2 = info1.root.line
        if(info2[0].name!="_coverImage"){
          info2.unshift({
            value:""
          })
          this.setData({
            images:info2[0],
            jsonItem:info2.slice(1)
          })
        }else{
          this.setData({
            images:info2[0],
            jsonItem:info2.slice(1)
          })
        }

      })
      // 获取册信息
      getItems({
        loginUserName: this.data.loginUserName,
        loginUserType: this.data.loginUserType,
        weixinId: this.data.oppenid,
        libId: this.data.libId,
        biblioPath: this.data.recpach,
      }).then(res=>{
        console.log(res,995);
        this.setData({
          books:res.itemList,
          itemBarcodes:res.itemList[0].barcode
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