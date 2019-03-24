// components/search/index.js
import { searchModel } from '../../models/search';
import { bookBev } from '../../common/js/book-beh';


const searchmodel = new searchModel();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [bookBev],
  properties: {
    more:{
      type:String,
      observer:'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    query: '',
    hotKeys: [],
    history: [],
    summary: 1,
    count: 10,
    searching: false,
    
  },
  lifetimes: {
    attached() {
      this._getHotKeys();
      this._getHistoryKeys();
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.init()
      this.triggerEvent('cancel', {}, {});
    },
    loadMore() {
      const count = this.data.count;
      if (!this.data.query) {
        return
      }
      //如果为true,说明正在发送请求，那么不应该去尝试发送新的请求
      //保证每次只完整的请求一次
      if (this.isLocked()) {
        return
      }
      //开始请求之前设为true,说明正在请求（锁住）
      if (this.hasMore()) {
        this.locked()
        searchmodel.getSearchResult({
          count: count,
          start: this.getCurrentStart(),
          q: this.data.query
        })
          .then(res => {
            this.setMoreData(res.books)
            this.unLocked()
          }, () => { //当网络比较慢，请求失败，那么解锁
            this.unLocked()
          })
        // 死锁
      }
    },
    _getSearchResult(val) {
      const summary = this.data.summary;
      const count = this.data.count;
      if (this.isLocked()) {
        return
      }
      this.init()
      this.locked()
      searchmodel
        .getSearchResult({ summary: summary, count: count, q: val })
        .then(res => {
          this.setMoreData(res.books)
          this.setTotal(res.total)
          this.unLocked() //请求成功设loading为false
          this.setData({
            searching: true
          });
        }, () => { //当网络比较慢，请求失败，那么解锁
          this.unLocked()
        });
     
    },
    onQuery: function(e) {
      let val = e.detail.val;
      if (val === '') {
        return;
      }
      this.setData({
        query: val
      })
      this._getSearchResult(val);
    },
    onConfirm(e) {
      let val = e.detail.val;
      searchmodel.addToHistory(val);
      this.setData({
        query: val
      });
    },
    onClear(e) {
      let val = e.detail.val;
      this.init() //初始化搜索数据，也就是数据重置清空
      this.setData({
        searching: val
      });
    },
    _getHotKeys: function() {
      searchmodel.getHotKey().then(res => {
        this.setData({
          hotKeys: res.hot
        });
      });
    },
    _getHistoryKeys() {
      this.setData({
        history: searchmodel.getHistory()
      });
    }
  }
});
