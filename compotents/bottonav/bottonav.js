// compotents/bottonav/bottonav.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {

    goRecourse(){
      wx.redirectTo({
        url: '/pages/resource/resource',
      })
    },
    gomylibary(){
      wx.redirectTo({
        url: '/pages/mylibrary/mylibrary',
      })
    },
    gomore(){
      wx.redirectTo({
        url: '/pages/more/more',
      })
    }
    
  }
})
