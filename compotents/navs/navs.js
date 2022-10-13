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
    },
    readerName:{
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
  
      
  }
  
})
