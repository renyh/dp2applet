// pages/account/account.ts
import {
    bound
} from "../../utils/axios"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value1: "",
        user: "111",
        onShow: false,
        x: 0,
        hiddens: ["姓名（不是账户名）", "证条号码", "电话号码", "工作人员账户"],
        prefix: ["NB", "", "TP", "UN"],
        lib: "" || "请选择图书馆",
        username: '',
        password: '',
        opid: wx.getStorageSync('opid'),
        libid: '',
      
    },
    selecTap() {
        this.setData({
            onShow: !this.data.onShow
        })
    },
    opption(e) {
        let Index = e.currentTarget.dataset.index
        this.setData({
            x: Index,
            onShow: !this.data.onShow
        })
    },
    skip() {
        wx.navigateTo({
            url: '/pages/libclassify/libclassify',
        })
    },
    // 找回密码
    findCode(){
      wx.navigateTo({
        url: '/pages/rePassword/rePassword',
      })
    },

    //  用户名
    myName(e) {
        this.setData({
            username: e.detail
        })
    },
    //  密码
    myWord(e) {
        this.setData({
            password: e.detail
        })
    },
    //  点击绑定按钮
    binding() {
     
          // 登录
        var data
        data = {
            "weixinId": this.data.opid,
            "libId": this.data.libid,
            "bindLibraryCode": '',
            "prefix": this.data.prefix[this.data.x],
            "word": this.data.username,
            "password": this.data.password
        }
        bound(data).then(res=>{
             console.log(res);
            if(res.errorCode==0){
              console.log(res.users,12366);
              wx.setStorageSync('list', res.users)
                wx.showToast({
                    title: '登录成功',    
                    icon: 'success',  
                    duration: 2000//持续的时间
                  })
                 
                setTimeout(()=>{
                 wx.navigateTo({
                    url: `../accManagement/accManagement`,
                  })
                },2000)
            }else{
              wx.showModal({
                title: '提示',
                content: res.errorInfo,
              })         
            } 
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options);
        this.setData({
            lib: options.libs,
            libid: options.libid
        })
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.request({
              url: `https://demo30.ilovelibrary.cn/i/api2/WxUserApi/GetAppletOpenId?code=${res.code}`,
              success:function(res){
                var oppenid = res.data.openid
                wx.setStorageSync('opid', oppenid)
              }
            })
          }
        })

    },
    //  下拉框

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