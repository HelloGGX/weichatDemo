import { HTTP } from '../utils/http';

class ClassicModel extends HTTP {
  getLatest() {
    return this.request({
      url: 'classic/latest'
    });
  }
  getClassicDetail({type,id}){
    return this.request({
      url: `classic/${type}/${id}`
    });
  }
  getClassic(index, nextOrPre) {
    let key =
      nextOrPre === 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    let classic = wx.getStorageSync(key);
    if (!classic) {
      //如果缓存里面没有，则向服务器请求
      return this.request({
        url: `classic/${index}/${nextOrPre}`
      });
    } else {
      //如果缓存里面有，则取缓存里面的数据
      return new Promise((resolve, reject) => {
        resolve(classic);
      });
    }
  }
  getClassicFavor(){
    return this.request({
      url:'/classic/favor'
    })
  }
  _getKey(index) {
    let key = 'classic-' + index;
    return key;
  }
}
export { ClassicModel };
