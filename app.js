// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
   
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: `https://demo30.ilovelibrary.cn/i/api2/WxUserApi/GetAppletOpenId?code=${res.code}`,
          success:function(res){
            var oppenid = res.data.openid
            wx.setStorageSync('oppenid', oppenid)
          }
        })
      }
    })

  },
  globalData: {
    userInfo: null
  }
})
