// pages/account/account.ts
import {
    bind,
    GetActiveUser,
} from "../../utils/axios"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value1: "",
        onShow: false,
        x: 0,
        hiddens: ["姓名（不是账户名）", "证条号码", "电话号码", "工作人员账户"],
        prefix: ["NB", "", "TP", "UN"],
        username: '',
        password: '',
        opid: "",
        libid: '',
        oppenid: wx.getStorageSync('oppenid'),
        libName: "" || "请选择图书馆",
        libs: wx.getStorageInfoSync("libs"),
        id: "" ,//解绑时用的id
        readerName:"",
        bindLibraryCode:""   //绑定时图书馆代码


    },
    // 下拉框展示
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
    findCode() {
        wx.navigateTo({
            url: '/pages/temporaryword/temporaryword',
        })
    },
    // 柜台绑定
    counterBound() {
        wx.navigateTo({
            url: '/pages/counter/counter',
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
            "bindLibraryCode":this.data.bindLibraryCode,   //todo
            "prefix": this.data.prefix[this.data.x],
            "word": this.data.username,
            "password": this.data.password
        }
        bind(data).then(res => {
            console.log(res,123);
            this.setData({
              id:res.users[0].id
            })
            if (res.errorCode == 0) {
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
                        url: `../../pages/accManagement/accManagement?id=${this.data.id}`,
                    })
                }, 2000)
            } else {
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
        // 获取对应参数集合

    },
    //  下拉框

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        var that = this
        wx.getStorage({
            key: 'oppenid',
            success(res) {
                that.setData({
                    opid: res.data
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        GetActiveUser({
            weixinId: this.data.oppenid
        }).then(res => {
          console.log(res,444);
            this.setData({
                weixinId: res.users[0].weixinId,
                libid: res.users[0].libId,
                libName: res.users[0].libName,
                bindLibraryCode:res.users[0].bindLibraryCode
            })
            if(res.users[0].userName){
              this.setData({
                readerName:res.users[0].userName,   
              })
            }else{
              this.setData({
                readerName:res.users[0].displayReaderName,
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