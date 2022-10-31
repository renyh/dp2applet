// compotents/books/books.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    biblio:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[],   //判断下方显示内容
    flag:"",
    num:""   //书目总数
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 携带书目路径跳转到详情页
    getDetail(e){
      var recpach = e.currentTarget.dataset.recpach
      wx.navigateTo({
        url: `/pages/detail/dtail?recpach=${recpach}`,
      })
    },
  },
  lifetimes:{
     
  }
})
