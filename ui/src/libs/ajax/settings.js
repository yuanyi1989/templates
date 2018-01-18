import util from '../util.js'
import globalConfig from '../../config'
import Cookies from 'js-cookie'



var gbs = {
  host: globalConfig.apiHost+globalConfig.apiBaseUri,
  db_prefix: 'gogy_admin_', // 本地存储的key

  // 状态码字段
  api_status_key_field: 'status',
  // 状态码value
  api_status_value_field: 1,

  // 存放数据的字段
  api_data_field: 'body',

  api_custom: {
      //服务端检测到未登录，清除数据返回登录界面
      0: function(res) {
          Cookies.remove(globalConfig.ssoTicketName);
          Cookies.remove(globalConfig.lastLoginCheckKey);
          Cookies.remove('roleCode');
          this.$store.commit('logout', this);
          this.$store.commit('clearOpenedSubmenu');

          if (globalConfig.ssoHost) {
              //如果设置了sso登录，跳转到sso登录界面
              var originURL = window.location.href;
              window.location.href = globalConfig.ssoHost+globalConfig.ssoBaseUri
                  +'?redirectURL='+encodeURIComponent(originURL);
          } else {
              this.$router.push({
                  name: 'login'
              });
          }
      },
      //未授权，跳转到403界面
      403: function (res) {
          util.openNewPage(this, 'error-403');
          this.$router.push({
              name: 'error-403'
          });
      },
      404: function(res) {
          util.openNewPage(this, 'error-404');
          this.$router.push({
              name: 'error-404',
              params: { 0:1 }
          });
      },
      500: function (res) {
          util.openNewPage(this, 'error-500');
          this.$router.push({
              name: 'error-500'
          });
      }
  }
}

var cbs = {
  /**
   * ajax请求成功，返回的状态码不是200时调用
   * @param  {object} err 返回的对象，包含错误码和错误信息
   */
  statusError (err) {
    //如果状态不是成功，则弹出错误提示
    var content = '错误编码(' + err.status + ') '+ (err.message || '未定异常');
    this.$Message.error({
        content: content,
        duration: 10,
        closable: true
    });

  },

  /**
   * ajax请求网络出错时调用
   */
  requestError (err) {
      console.log(err);
    this.$Message.error({
      showClose: true,
      content: '请求错误：' + (err.response ? err.response.status : '') + ',' + (err.response ? err.response.statusText : ''),
      type: 'error'
    })
  }
}

export {
  gbs,
  cbs
}
