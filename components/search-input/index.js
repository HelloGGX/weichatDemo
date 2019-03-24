// components/search-input/index.js
import { debounce } from '../../utils/util';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    query: {
      type: String,
      observer: function(val) {
        this.data.debouncer(val);
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    debouncer: null,
    searching: false
  },
  /**
   * 组件的生命周期
   */
  lifetimes: {
    created() {
      // 在组件实例刚刚被创建时执行初始化debounce返回的函数
      let debouncer = debounce(val => {
        this.setData({
          searching: val === '' ? false : true
        });
        this.triggerEvent(
          //派发一个事件出去
          'onQuery',
          { val: val },
          {}
        );
      }, 220);
      this.data.debouncer = debouncer
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onQuery(e) {
      let val = e.detail.value;
      this.setData({
        query: val
      });
    },
    onConfirm(e) {
      let val = e.detail.value;
      this.triggerEvent(
        //派发一个事件出去
        'confirm',
        { val: val },
        {}
      );
    },
    clear() {
      this.setData({
        searching: false,
        query: ''
      });
      this.triggerEvent(
        //派发一个事件出去
        'clear',
        {
          val: false
        }
      );
    }
  }
});
