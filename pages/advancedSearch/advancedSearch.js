// pages/advancedSearch/advancedSearch.js
import {GetActiveUser,Searchbook} from "../../utils/axios"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oppenid: wx.getStorageSync('oppenid'),  // 唯一ID
    weixinId:"",
    libId:"",   //图书馆id
    onShow:false,
    loginUserType:"",
    loginUserName:"",
    hiddens:["全部","书名","ISBN","作者","主题词","分类号","出版时间","出版社"],
    x:0,
    item:"",
    list:["前方一致","中间一致","后方一致","精确一致"],
    Show:false,
    y:0,
    value:"",
    from:["title,ISBN,contributor,subject,clc,_class,publishtime,publisher","title","ISBN","contributor","subject","clc","_class,publishtime","publisher"],
    match:["left","middle","right","exact"],
    value:"",//输入框内容
    books:[],
    libName:"",
    readerName:""
  },
  inputOne(){
    this.setData({
      onShow:!this.data.onShow
    })
  },
  inputTwo(){
    this.setData({
      Show:!this.data.Show
    })
  },
  opption(e) {
    console.log(e);
    let Index = e.currentTarget.dataset.index
    this.setData({
        x: Index,
        onShow: !this.data.onShow,
    })
},
getlist(e){
  let Index = e.currentTarget.dataset.index
  this.setData({
      y: Index,
      Show: !this.data.Show,
  })
},
// 跳搜索页
simpleSearch(){
  wx.navigateTo({
    url: '/pages/searching/searching',
  })
},
// 检测输入框内容
searchChange(e){
this.setData({
  value:e.detail.value
})
},
// 检索查询书目
search(){
  Searchbook({
    loginUserName:this.data.loginUserName,
    loginUserType:this.data.loginUserType,
    weixinId:this.data.weixinId,
    libId:this.data.libId,
    from:this.data.from[this.data.x],
    word:this.data.value,
    match:this.data.match[this.data.y],
    resultSet:"applet"
  }).then(res=>{
    console.log(res);
    this.setData({
      books:res.records
    })
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
    GetActiveUser({weixinId:this.data.oppenid}).then(res=>{
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
        libName:res.users[0].libName
      })
      if(res.users[0].type==0){
        this.setData({
         loginUserType:"patron",
         loginUserName:res.users[0].displayReaderName
        })
      }else if(res.users[0].type==1){
       this.setData({
         loginUserType:"",
         loginUserName:res.users[0].userName
        })
      }
      this.setData({
        weixinId:res.users[0].weixinId,
        libId:res.users[0].libId
      })
      // 判断左上角显示
 
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