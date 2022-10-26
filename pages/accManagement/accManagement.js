// pages/accManagement/accManagement.js
    import {GetBindUsers,GetActiveUser, baseUrl} from "../../utils/axios"
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
   bindUserid:"",  //解绑id
   oppenid: wx.getStorageSync('oppenid'),
   libName:"",   //图书馆名字
   displayReaderName:"" , //证条号码
   readerList:[], //读者账号合集
   wokerList:[], //工作人员账号合集
   flag:"",

  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    GetBindUsers({
      weixinId:this.data.oppenid,
      containPublic:false
    }).then(res=>{
      //判断身份
      this.data.readerList=[],
      this.data.wokerList=[]
      res.users.forEach((item,index)=>{
        if(item.type==0){
          this.data.readerList.push(item)
          this.setData({
            readerList:this.data.readerList,
            bindUserid:item.id,
          })
        }
        if(item.type==1){
          this.data.wokerList.push(item)
          this.setData({
            wokerList:Array.from(new Set(this.data.wokerList)),
            bindUserid:item.id
          })
        }
      })
    })
  },
  // 去主页
  goHome(){
    wx.switchTab({
      url: '/pages/resource/resource',
    })
  },
  unbundle(){
      
// 发请求解绑
  
   wx.request({
     url: baseUrl+`/i/api2/wxuserApi/Unbind?bindUserId=${this.data.bindUserid}`,
     method:"DELETE",
     success(res){
       console.log(res,191919);
            if(res.data.errorCode==0){
                wx.showToast({
                    title: '解绑成功',    
                    icon: 'success',  
                    duration: 2000//持续的时间
                  })
                  wx.removeStorage({
                    key: 'binduser',   
                    success (res) {
                      console.log(res)
                    }
                  })
                  setTimeout(()=>{
                      wx.redirectTo({
                        url: '/pages/account/account',
                      })
                  },2000)
             }else{
                wx.showToast({
                    title: res.errorInfo,
                    icon: 'success',
                    duration: 2000
                  })
             }
        
         console.log(res.data);
         
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
    GetActiveUser({weixinId:this.data.oppenid,}).then(res=>{
      console.log(res);
      if(res.users[0].userName=="public"){
        this.setData({
          flag:true,
          libName:res.users[0].libName
        })
      }else{
        this.setData({
          flag:false,
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