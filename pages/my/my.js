// pages/my/my.js
import { bookModel } from '../../models/book';
import { ClassicModel } from '../../models/classic';

const bookmodel = new bookModel()
const classicmodel = new ClassicModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false, //是否已经验证
    userInfo: null,
    myFavor:[],
    bookCount:0
  },
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },
  userAuthorized(){
    wx.getSetting({
      success:res=> {
        if (res.authSetting['scope.userInfo']) {//如果已经授权
          wx.getUserInfo({
            success: res => {
              const userInfo = res.userInfo
              this.setData({
                authorized: true,
                userInfo: userInfo
              })
            }
          })
        }
      }
    })
  },
  getBookFavorCount(){
    bookmodel.getMyBookCount().then(res=>{
      this.setData({
        bookCount:res.count
      })
    })
  },
  getMyFavor(){
    classicmodel.getClassicFavor().then(res=>{
      this.setData({
        myFavor:res
      })
    })
  },
  onShow: function (options) {
    this.userAuthorized()
    this.getBookFavorCount()
    this.getMyFavor()
  },
  onToDetail:function(res){
    const data = res.detail.data
    const type = data.type
    const id=data.id
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?type=${type}&id=${id}`
    })
  }
})