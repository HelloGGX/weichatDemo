// components/button/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    openType: {
      type: String
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
    onGetUserInfo(event){
      const userInfo = event.detail.userInfo
      this.triggerEvent(
        //派发一个事件出去
        'getUserInfo',
        {
          userInfo: userInfo
        },
        {}
      );
    }
  }
})
