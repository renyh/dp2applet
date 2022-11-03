  import {
    GetActiveUser,
    GetPatronQRcode,
    GetBindUsers
  } from "../../utils/axios"
  const qrCode = require("../../utils/weapp-qrcode.js")
  Page({

    /**
     * 页面的初始数据
     */
    data: {
      oppenid: wx.getStorageSync('oppenid'),
      weixinId: "",
      libId: "", //图书馆id,
      patronBarcode: "", //读者证条码号
      qctext: '', //二维码信息
      readerName: "", //读者姓名
      libName: "",
      userName: "", //判断显示界面
      type: "", //个人类型
      x: "",
      y: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {


    },
    slectLibary() {
      wx.navigateTo({
        url: '/pages/selectlib/selectlib',
      })
    },
    // 跳转到绑定页面
    goLogin() {
      GetBindUsers({
        weixinId: that.data.oppenid,
        containPublic: false
      }).then(res => {
        if (res.users.length) {
          wx.navigateTo({
            url: '/pages/accManagement/accManagement',
          })
        } else {
          wx.navigateTo({
            url: '/pages/account/account'
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
      var that = this
      wx.getStorage({
        key: 'oppenid',
        success(res) {
          console.log(res.data);
          that.setData({
            oppenid: res.data
          })
          // 获取用户信息
          GetActiveUser({
            weixinId: that.data.oppenid,
          }).then(res => {
            if (res.users == null) {
              that.setData({
                y: 1
              })
            } else {
              that.setData({
                libId: res.users[0].libId,
                patronBarcode: res.users[0].displayReaderBarcode,
                readerName: res.users[0].readerName,
                weixinId: res.users[0].weixinId,
                libName: res.users[0].libName,
                userName: res.users[0].userName,
                type: res.users[0].type,
                y: 0
              })
            }

            if (that.data.type == "0") {
              that.setData({
                x: 0
              })
            } else { //说明为public，未绑定读者账号
              that.setData({
                x: 1
              })
            }


            // 获取二维码信息
            GetPatronQRcode({
              weixinId: that.data.weixinId,
              libId: that.data.libId,
              patronBarcode: that.data.patronBarcode
            }).then(res => {
              console.log(res, 77777);
              that.setData({
                qctext: res.info
              })
              // 生成二维码
              new qrCode("myCanvas", {
                text: that.data.qctext,
                width: 200,
                height: 200,
                padding: 12,
                callback: res => {
                  that.setData({
                    codePath: res.path
                  })
                }
              })
            })
          })

        }
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