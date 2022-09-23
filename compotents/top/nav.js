// compotents/top/nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
     arr:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes:{
      attached(){
        this.setData({
            arr: wx.getStorageSync('list')
          }) 
          console.log(this.data.arr,333666);
      }
  }
})
