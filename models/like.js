import { HTTP } from '../utils/http';

class LikeModel extends HTTP {
  like(behavior, artID, category) {
    let url = behavior === 'like' ? 'like' : '/like/cancel';
    return this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    });
  }
  getClassicLikeStatus(type, id) {
    return this.request({
      url: `/classic/${type}/${id}/favor`
    });
  }
}
export { LikeModel };
