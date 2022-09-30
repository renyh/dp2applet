// compotents/navtop.js
import {getPublic} from "../../utils/axios"

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
    libName:"" ,//图书馆名字
    arr: [],
    readerName:""
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
      attached(){ 
        this.setData({
          arr:wx.getStorageSync('list')
         })
         console.log(this.data.list.length);
        if(this.data.list.length){
        this.setData({
          readerName:"public"
        })
        }else{
          this.setData({
            readerName:wx.getStorageSync("ReaderName")
          })
        }
      },
      created(){
      
       
      }
  }
  
})
