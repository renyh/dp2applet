// compotents/navtop.js
import {GetActiveUser} from  "../../utils/axios"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  list:{
      type:String,
      value:[]
    }
  },
   
  /*
   * 组件的初始数据
   */
  data: {
    oppenid: wx.getStorageSync('oppenid'),
    libName:"",//图书馆名字
    arr: [],
    readerName:""  //证条者号
  },

  /**
   * 组件的方法列表
   */
  methods: {
     jmp(){
         wx.navigateTo({
           url: '/pages/libclassify/libclassify',
         })
     }
  },
  lifetimes:{
    // 判断左上角显示public或读者姓名
      attached(){ 
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
        })
      },
      
  }
  
})
