// pages/searching/searching.js
import {getPublic,Searchbook} from "../../utils/axios"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oppenid: wx.getStorageSync('oppenid'),
    loginUserName:"" ,// 读者账号
    loginUserType:"",//类型
    libId:"",// 图书馆Id
    from:["title","ISBN","contributor","subject,clc","_class,publishtime","publisher"], //检索途径
    word:"",//检索词
    match:"",//简单检索传left
    resultSet:"",  //前端指定的一个结果集名称，用于分批获取。
    libName:"",  //图书馆名字
    books:[],
    wxid:"",
    book:[],
    words:15
  },

  // 点击跳转到详情
  getDetail(e){
    console.log(e.currentTarget.dataset.recpach);
    var recpach = e.currentTarget.dataset.recpach
    wx.navigateTo({
      url: `/pages/detail/dtail?recpach=${recpach}`,
    })


  },
 
// 检索下方信息
geticon(){
  Searchbook({
    "loginUserName":this.data.loginUserName,
    "loginUserType":this.data.loginUserType,
    "weixinId":this.data.wxid,
    "libId":this.data.libId,
    "from":"title,ISBN,contributor,subject,clc,_class,publishtime,publisher",
    "word":this.data.word,
    "match":"left",
    "resultSet":"applet"
  }).then(res=>{
    this.setData({
      books:res.records,
      book:res
    })
    
  })
},
// 获取输入框信息
getword(e){
  console.log(e.detail.value);
    this.setData({
      word:e.detail.value
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    getPublic({weixinId:this.data.oppenid}).then(res=>{
     this.setData({
       libName:res.users[0].libName
     })
     if(res.users[0].type==0){
       this.setData({
        loginUserType:"patron",
        loginUserName:res.users[0].displayReaderName,
       })
     }else if(res.users[0].type==1){
      this.setData({
        loginUserType:"",
        loginUserName:res.users[0].userName
       })
     }
     this.setData({
      libId:res.users[0].libId,
      wxid:res.users[0].weixinId
     })
   })
  },
  advancedSearch(){
    wx.navigateTo({
      url: '/pages/advancedSearch/advancedSearch',
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
  // 进入高级检索页面


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.setData({
      words:this.data.words+10
    })
    Searchbook({
      "loginUserName":this.data.loginUserName,
      "loginUserType":this.data.loginUserType,
      "weixinId":this.data.oppenid,
      "libId":this.data.libId,
      "from":"_N",
      "word":this.data.words,
      "match":"left",
      "resultSet":"applet"
    }).then(res=>{
      console.log(res);
      this.data.books.push(...res.records)
      this.setData({
        books:this.data.books
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
  
  }
})