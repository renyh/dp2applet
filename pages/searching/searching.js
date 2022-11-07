// pages/searching/searching.js
import {
  GetActiveUser,
  SearchBiblio
} from "../../utils/axios"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oppenid: wx.getStorageSync('oppenid'),
    loginUserName: "", // 读者账号
    loginUserType: "", //类型
    libId: "", // 图书馆Id
    word: "", //检索词
    resultSet: "", //前端指定的一个结果集名称，用于分批获取。
    biblio: [],
    wxid: "",
    startNo: "",
    placeholder: "请输入检索词" || "",
    errorInfo: "", //提示信息
    isReturnRecords: "",
    berror: "", //判断显示下方显示信息
    y: "",
    isCanNext: true,
    flag: false,
    resultSetName: ""

  },

  // 点击跳转到详情
  getDetail(e) {
    var recpach = e.currentTarget.dataset.recpach
    wx.navigateTo({
      url: `/pages/detail/dtail?recpach=${recpach}`,
    })
  },
  getSearchBiblio() {
    SearchBiblio({
      "loginUserName": this.data.loginUserName,
      "loginUserType": this.data.loginUserType,
      "weixinId": this.data.wxid,
      "libId": this.data.libId,
      "from": "title,ISBN,contributor,subject,clc,_class,publishtime,publisher",
      "word": this.data.word,
      "match": "left",
      "resultSet": ""
    }).then(res => {
      console.log(res, 999);
      if (res.apiResult.errorCode == -1) {
        wx.showModal({
          title: '提示',
          content: res.apiResult.errorInfo,
        })
        this.setData({
          errorInfo: res.apiResult.errorInfo,
          berror: false,

        })
      } else {
        // 判断图书命中方式
        if (res.records != null) {
          this.setData({
            biblio: res,
            isReturnRecords: false,
            berror: true,
            startNo: res.resultCount,
            resultSetName: res.resultSetName,
          })
        } else {
          this.setData({
            isReturnRecords: true,
            biblio: [],
            berror: true
          })
        }

      }
    })
  },
  // 检索下方信息
  geticon() {
    this.getSearchBiblio()
  },
  // 获取输入框信息
  getword(e) {
    
    this.setData({
      word: e.detail.value
    })
    console.log(this.data.word);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //   点击扫描二维码
  scanCodeEvent() {
    var that = this;
    wx.scanCode({
      onlyFromCamera: true, // 只允许从相机扫码
      success(res) {
        // 扫码成功后  在此处理接下来的逻辑
        that.setData({
          word: res.result,
          placeholder: res.result
        })
        that.getSearchBiblio()
      }
    })
  },
  onLoad(options) {

  },
  advancedSearch() {
    wx.navigateTo({
      url: '/pages/advancedSearch/advancedSearch',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  slectLibary() {
    wx.navigateTo({
      url: '/pages/selectlib/selectlib',
    })
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
        GetActiveUser({
          weixinId: that.data.oppenid
        }).then(res => {
          if (res.users == null) {
            that.setData({
              y: 1
            })
          } else {
            that.setData({
              y: 0
            })
            if (res.users[0].type == 0) {
              that.setData({
                loginUserType: "patron",
                loginUserName: res.users[0].displayReaderName,
              })
            } else if (res.users[0].type == 1) {
              that.setData({
                loginUserType: "",
                loginUserName: res.users[0].userName
              })
            }
            that.setData({
              libId: res.users[0].libId,
              wxid: res.users[0].weixinId
            })
          }


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
  // 进入高级检索页面


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log(this.data.isCanNext);
    if (this.data.isCanNext == true) {
      SearchBiblio({
        "loginUserName": this.data.loginUserName,
        "loginUserType": this.data.loginUserType,
        "weixinId": this.data.oppenid,
        "libId": this.data.libId,
        "from": "_N",
        "word": this.data.startNo,
        "match": "left",
        "resultSet": this.data.resultSetName
      }).then(res => {
        console.log(res);
        if (res.records == null) {
          this.setData({
            isCanNext: false
          })
          return
        } else {
          this.data.biblio.records.push(...res.records)
          this.setData({
            biblio: this.data.biblio,
            startNo: this.data.startNo + res.resultCount
          })
        }
      })
    }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})