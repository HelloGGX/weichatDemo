// pages/book-detail/book-detail.js
import { bookModel } from '../../models/book';
import { LikeModel } from '../../models/like';

const likeModel = new LikeModel();
const bookmodel = new bookModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: {},
    commentsNum: 8,
    comments:[],
    favor: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getDetail(options.bid).then(res=>{
      this.setData({
        book: res[0],
        comments: res[1].comments,
        favor:res[2]
      })
    })
  },
  _getDetail: function (id) {
    let detail = bookmodel.getDetail(id)
    let comments = bookmodel.getShortComment(id)
    let favor = bookmodel.getBookFavor(id)
    return Promise.all([detail, comments, favor])
  },
  onLike: function (event) {
    const behavior = event.detail.behavior;
    const artID = this.data.book.id;
    const type = 400;
    likeModel
      .like(behavior, artID, type)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      wx.showShareMenu({
        withShareTicket: true
      });
    }
    return {
      title: this.data.book.title,
      path: `/pages/book-detail/book-detail?id=${this.data.book.id}}`
    };
  }
})