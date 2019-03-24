// components/classic/essay/index.js
import { classicBeh } from '../../../common/js/classic-beh';
import computedBehavior from 'miniprogram-computed';

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh, computedBehavior], //相当于mixin
  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {}
});
