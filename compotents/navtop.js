// compotents/navtop.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:String
  },
   
  /*
   * 组件的初始数据
   */
  data: {
     libName: wx.getStorageSync('key') || "数字图书馆"//图书馆名字
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
    
      }
  }
  
})
