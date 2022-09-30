// compotents/books/books.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    books:{
      type:Array
    }
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
    getDetail(e){
      console.log(e.currentTarget.dataset.recpach);
      var recpach = e.currentTarget.dataset.recpach
      wx.navigateTo({
        url: `/pages/detail/dtail?recpach=${recpach}`,
      })
    },
  }
})
