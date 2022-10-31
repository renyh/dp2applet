// compotents/navtop.js
import{GetActiveUser} from "../../utils/axios"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
 
  },
   
  /*
   * 组件的初始数据
   */
  data: {
    accountName:"",
     libName:"",
     oppenid: wx.getStorageSync('oppenid'),
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectlib(){
         wx.navigateTo({
           url: '/pages/selectlib/selectlib',
         })
     },
    getActivelib(){
      GetActiveUser({
        weixinId: this.data.oppenid
      }).then(res => {
        if (res.users!= null) {
          //判断导航栏左上角信息提示
          if (res.users[0].type == 0) {
            this.setData({
              accountName: res.users[0].readerBarcode,
            })
          } else {
            this.setData({
              accountName: res.users[0].userName,
            })
          }
          this.setData({
            libName: res.users[0].libName
          })
        }  
      })
     }
  },
  lifetimes:{
 
      
  }
  
})
