// components/like/like.js
import computedBehavior from 'miniprogram-computed';

Component({
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  computed:{
    likeStatus(){
      return this.properties.like === 1 ? this.data.yes_src : this.data.no_src
    },
    normizeCount: function () {
      let num = this.data.count
      const si = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'K' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' }
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      let i;
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break;
        }
      }
      return (num / si[i].value).toFixed(2).replace(rx, '$1') + si[i].symbol
    },
  },
  properties: {
    readOnly:{
      type:Boolean,
      value:false
    },
    like: {
      type: Number,
      value: 0
    },
    count: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yes_src: 'images/like.png',
    no_src: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    onLike: function(event) {
      //自定义事件
      if(this.properties.readOnly){
        return
      }
      let like = !this.properties.like;
      let count = this.properties.count;
      count = like ? ++count : --count;
      this.properties.count = count
      this.setData({
        like: like
      });
      //激活
      let behavior = this.properties.like ? 'like' : 'cancel';
      this.triggerEvent(
        //派发一个事件出去
        'like',
        {
          behavior: behavior
        },
        {}
      );
    }
  }
});
