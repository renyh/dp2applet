// pages/detail/dtail.js
import {
  GetActiveUser,
  GetBiblio,
  getItems,
  GetPatron,
  baseUrl
} from "../../utils/axios"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recpach: "", //接受跳转过来的书目路径
    oppenid: wx.getStorageSync('oppenid'),
    loginUserName: "",
    loginUserType: "",
    libId: "",
    displayReaderBarcode: "", //读者证条码号
    itemBarcodes: "", //册条码号
    format: "table",
    binduser: [],
    jsonItem: [], //转化
    images: [], //图片管理
    books: [], //册信息
    userName: "", //判断是否为读者
    bappointmentbiblio: "",
    barcode: "",
    bappointmentbiblio: true,
    bgivebiblio: false,
    bappointmentsuccess: false,
    errorInfo: "",
    patronBarcode: "",
    userName: "",
    infos: [], //预约信息
    infoss: "未预约",
    itemList:""  //判断册信息
  },
  // 跳转到绑定账户界面
  goBound() {
    wx.navigateTo({
      url: '/pages/account/account',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      recpach: options.recpach,

    })



  },
  goHere() {
    if (this.data.binduser.length) {
      wx.navigateTo({
        url: '/pages/accManagement/accManagement',
      })
    } else {
      wx.navigateTo({
        url: '/pages/account/account'
      })
    }
  },

  //点击进行图书预约
  getSubscribe() {
    var that = this
    wx.showModal({
      title: '提示',
      content: `你确定对该册进行预约吗？`,
      success(res) {
        if (res.confirm) {
          wx.request({
            url: baseUrl+`/i/api2/CirculationApi/Reserve?weixinId=${that.data.oppenid}&libId=${that.data.libId}&patronBarcode=${that.data.displayReaderBarcode}&itemBarcodes=${that.data.itemBarcodes}&style=new`,
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success(res) {
              console.log(res.data, 66644);
              if (res.data.errorCode == 0) {
                that.setData({
                  errorInfo: res.data.errorInfo
                })
                that.setData({
                  bappointmentbiblio: false,
                  bgivebiblio: true,
                  bappointmentsuccess: true,
                  infoss: "已到书"
                })
              }
            }
          })
        } 
      }
    })

  },
  // 放弃取书
  giveUpBook() {

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
      console.log(res, 666666);
      if (res.users[0].type == 0) {
        this.setData({
          bappointmentbiblio: false,
          loginUserType: "patron",
          loginUserName: res.users[0].readerBarcode,
          displayReaderBarcode: res.users[0].displayReaderBarcode
        })
      } else if (res.users[0].type == 1) {
        this.setData({
          bappointmentbiblio: true,
          loginUserType: "",
          loginUserName: res.users[0].userName
        })
      }
      this.setData({
        libId: res.users[0].libId,
        patronBarcode: res.users[0].displayReaderBarcode,
        userName: res.users[0].userName,
      })
      // 数目详情
      GetBiblio({
        loginUserName: this.data.loginUserName,
        loginUserType: this.data.loginUserType,
        weixinId: this.data.oppenid,
        libId: this.data.libId,
        biblioPath: this.data.recpach,
      }).then(res => {
        console.log(res.info);
        // res.info = res.info.replace(/@/g, '')
        var biblio = JSON.parse(res.info)
        console.log(biblio,1111);
        var biblios = biblio.root.line
      
        if (biblios[0]["@name"] != "_coverImage") {
          biblios.unshift({
           "@value": ""
          })
          this.setData({
            images: biblios[0]["@value"],
            jsonItem: biblios.slice(1)
          })
        } else {
          this.setData({
            images: biblios[0]["@value"],
            jsonItem: biblios.slice(1)
          })
        }
        console.log(this.data.images,this.data.jsonItem,999999);

      })
      // 获取预约信息i
      GetPatron({
        libId: this.data.libId,
        patronBarcode: this.data.patronBarcode,
        userName: this.data.userName
      }).then(res => {
        this.setData({
          infos: res.obj.reservations
        })
      })
      // 获取册信息
      getItems({
        loginUserName: this.data.loginUserName,
        loginUserType: this.data.loginUserType,
        weixinId: this.data.oppenid,
        libId: this.data.libId,
        biblioPath: this.data.recpach,
      }).then(res => {
        console.log(res,995);
        if(res.itemList.length){
          this.setData({
            barcode: res.itemList.barcode,
            books: res.itemList,
            itemBarcodes: res.itemList[0].barcode,
            itemList:res.itemList
          })
        }
        if(this.data.infos){
          this.data.infos.forEach(item => {
            res.itemList.forEach(item1 => {
              if (item.pureBarcodes == item1.barcode) {
                this.setData({
                  bappointmentbiblio: false,
                  bgivebiblio: true,
                  bappointmentsuccess: true,
                  infoss: "已到书"
                })
              }
            })
          })
        }
        
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