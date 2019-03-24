// components/book/index.js
import computedBehavior from 'miniprogram-computed'
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [computedBehavior],
  properties: {
    book: Object
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail() {
      const bid = this.properties.book.id
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}`
      })
    }
  }
});
