// pages/book/book.js
import { bookModel } from '../../models/book';
import { random } from '../../utils/util';

const bookmodel = new bookModel();

Page({
  /**
   * 页面的初始数据
   */

  data: {
    books: [],
    searching: false,
    more: false
  },
  onSearch: function() {
    this.setData({
      searching: true
    });
  },
  onCancel: function() {
    this.setData({
      searching: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    bookmodel.getHotLists().then(res => {
      this.setData({
        books: res
      });
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      more: random(16)
    });
  }
});
