// components/epsoide/index.js
import computedBehavior from 'miniprogram-computed';


Component({
  behaviors: [computedBehavior], //相当于mixin
  /**
   * 组件的属性列表
   */
  computed:{
    getInedx(){
      let index = this.properties.index
      return index < 10 ? '0' + index : index;
    }
  },
  properties: {
    index: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ],
    year: 0,
    month: ''
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      this.setData({
        year: year,
        month: this.data.months[month]
      });
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {}
});
