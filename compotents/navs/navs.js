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
     oppenid: "",
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
      var that = this
      wx.getStorage({
        key:'oppenid',
        success(res){
          console.log(res.data);
          that.setData({
            oppenid:res.data
          })
          GetActiveUser({
            weixinId: that.data.oppenid
          }).then(res => {
            console.log(res,123);
            if (res.users!= null) {
              //判断导航栏左上角信息提示
              if (res.users[0].type == 0) {
                that.setData({
                  accountName: res.users[0].readerBarcode,
                })
              } else {
                that.setData({
                  accountName: res.users[0].userName,
                })
              }
              that.setData({
                libName: res.users[0].libName
              })
            }  
          })
         
        }
      })

     }
  },
  lifetimes:{
   
      
  }
  
})
// var that = this
// wx.getStorage({
//   key:'oppenid',
//   success(res){
//     console.log(res.data);
//     that.setData({
//       oppenid:res.data
//     })
   
//   }
// })
