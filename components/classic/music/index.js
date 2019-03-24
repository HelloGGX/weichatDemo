// components/classic/music/index.js
import { classicBeh } from '../../../common/js/classic-beh';
import computedBehavior from 'miniprogram-computed';

const bgAudio = wx.getBackgroundAudioManager();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh, computedBehavior], //相当于mixin
  properties: {
    src: String,
    title: String
  },
  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },
  lifetimes: {
    attached(event) {
      // 在组件实例进入页面节点树时执行
      this._recoverStatus();
      this._monitorSwitch();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(e) {
      if (!this.data.playing) {
        this.setData({
          playing: true
        });
        bgAudio.title = this.properties.title;
        bgAudio.src = this.properties.src;
        console.log('播放');
      } else {
        this.setData({
          playing: false
        });
        console.log('暂停');
        bgAudio.pause();
      }
    },
    _recoverStatus: function() {
      if (bgAudio.paused) {
        this.setData({
          playing: false
        });
        return;
      }
      if (bgAudio.src === this.properties.src) {
        this.setData({
          playing: true
        });
      }
    },
    _monitorSwitch: function() {
      bgAudio.onPlay(() => {
        this._recoverStatus();
      });
      bgAudio.onPause(() => {
        this._recoverStatus();
      });
      bgAudio.onStop(() => {
        this._recoverStatus();
      });
      bgAudio.onEnded(() => {
        this._recoverStatus();
      });
    }
  }
});
