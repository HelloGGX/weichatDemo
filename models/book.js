import { HTTP } from '../utils/http';

class bookModel extends HTTP {
  getHotLists() {
    return this.request({
      url: '/book/hot_list'
    });
  }
  getDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`
    });
  }
  getShortComment(bid){//获取短评
    return this.request({
      url: `/book/${bid}/short_comment`
    });
  }
  getBookFavor(bid){
    return this.request({
      url: `/book/${bid}/favor`
    });
  }
  getMyBookCount() {
    return this.request({
      url: '/book/favor/count'
    })
  }
}
export { bookModel };
