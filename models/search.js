import { HTTP } from '../utils/http';

export class searchModel extends HTTP {
  constructor({ key = 'q', maxLength = 10 } = {}) {
    super();
    this.key = key;
    this.maxLength = maxLength;
  }
  getSearchResult({ start=0, count = 20, summary = 0, q = '' } = {}) {
    return this.request({
      url: '/book/search',
      data: {
        start: start,
        count: count,
        summary: summary,
        q: q
      }
    });
  }
  getHistory() {
    const words = wx.getStorageSync(this.key);
    if (!words) {
      return [];
    }
    return words;
  }
  getHotKey() {
    return this.request({
      url: '/book/hot_keyword'
    });
  }
  addToHistory(keyword) {
    const keys = this.getHistory();
    const has = keys.includes(keyword);

    if (!has) {
      //如果不存在已经搜索的关键词
      keys.unshift(keyword);
      if (keys.length > this.maxLength) {
        keys.pop();
      }
    } else {
      //如果已经存在
      const index = keys.indexOf(keyword);
      keys.splice(index, 1);
      keys.unshift(keyword);
    }
    wx.setStorageSync(this.key, keys);
  }
}
