// components/card/index.js
import computedBehavior from 'miniprogram-computed';
Component({
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    data:Object
  },
  computed:{
    type(){
      const type = {
        100: '电影',
          200: '音乐',
            300: '句子'
      }
      return type[this.properties.data.type]
    },
    cover(){
      return this.properties.data.type === 200? 'cover':'img'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    type:''
  },
  lifetimes: {
    attached() {
      
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(){
      
      this.triggerEvent(
        //派发一个事件出去
        'toDetail',
        {
          data: this.properties.data
        },
        {}
      );
    }
  }
})
