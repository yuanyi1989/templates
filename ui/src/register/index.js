/**
 * Created by sailengsi on 2017/5/11.
 */
import Vue from 'vue'
import plugins from './plugin'


/**
 * 把一些全局对象和一些全局方法，注册到Vue原型上
 */
Vue.use({
  install (Vue, options) {
    //Vue.mixin(mixins)

      // 注册全局方法，如常用的接口方法，工具方法等。
      var i, length;
      var keys = [];
      for (var key in plugins) {
          keys.push(key);
      }

      for (i = 0, length = keys.length; i < length; i++) {
          var key = keys[i];
          var item = plugins[key];
          Vue.prototype['$$' + key] = item;
      }

  }
})
