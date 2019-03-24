//Page Object
import { ClassicModel } from '../../models/classic';
import { LikeModel } from '../../models/like';

let classicModel = new ClassicModel();
let likeModel = new LikeModel();

Page({
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      wx.showShareMenu({
        withShareTicket: true
      });
    }
    return {
      title: this.data.classic.content,
      path: `/pages/classic/classic?id=${this.data.classic.id}& type=${
        this.data.classic.type
      }`
    };
  },
  onLoad: function(options) {
    //wx.request是异步的，小程序只有异步
    classicModel.getLatest().then(res => {
      wx.setStorage({
        key: 'latest',
        data: res.index
      });
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      });
    });
  },
  onLike: function(event) {
    const behavior = event.detail.behavior;
    const artID = this.data.classic.id;
    const type = this.data.classic.type;
    likeModel
      .like(behavior, artID, type)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  },
  onLeft: function(e) {
    console.log(e);
  },
  isFirst(index) {
    return index === 1 ? true : false;
  },
  isLatest: function(index) {
    return index == wx.getStorageSync('latest');
  },
  onNext: function() {
    this._updateClassic('next');
  },
  onPrevious: function() {
    this._updateClassic('previous');
  },
  _updateClassic: function(nextOrPre) {
    let index = this.data.classic.index;
    classicModel.getClassic(index, nextOrPre).then(res => {
      wx.setStorageSync(classicModel._getKey(res.index), res);
      this._getLikeStatus(res.type, res.id);
      this.setData({
        classic: res,
        latest: this.isLatest(res.index),
        first: this.isFirst(res.index)
      });
    });
  },
  _getLikeStatus: function(type, id) {
    likeModel.getClassicLikeStatus(type, id).then(res => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      });
    });
  }
});
