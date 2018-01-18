/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
export default [
  {
    name: '登录',
    method: 'login',
    path: '/user/login',
    type: 'post'
  },
    {
        name: '检测登录状态',
        method: 'isLoggedIn',
        path: '/user/loggedIn',
        type: 'post'
    },
    {
        name: '登录',
        method: 'login0',
        path: '/user/login/0',
        type: 'post'
    },
    {
        name: '登录',
        method: 'login1',
        path: '/user/login/1',
        type: 'post'
    },
    {
        name: '登录',
        method: 'login2',
        path: '/user/login/2',
        type: 'post'
    },
    {
        name: '登录',
        method: 'login403',
        path: '/user/login/403',
        type: 'post'
    },
    {
        name: '登录',
        method: 'login404',
        path: '/user/login/404',
        type: 'post'
    },
    {
        name: '登录',
        method: 'login500',
        path: '/user/login/500',
        type: 'post'
    },
  {
    name: '注册',
    method: 'register',
    path: '/User/register',
    type: 'post'
  },
  {
    name: '获取用户列表',
    method: 'selectUser',
    path: '/User/selectUser',
    type: 'get'
  },

  {
    name: '添加修改用户公用接口',
    method: 'saveUser',
    path: '/User/saveUser',
    type: 'post'
  },
  {
    name: '删除用户',
    method: 'deleteUser',
    path: '/User/deleteUser',
    type: 'post'
  },
  {
    name: '获取用户信息',
    method: 'findUser',
    path: '/User/findUser',
    type: 'get'
  },

  {
    name: '修改密码',
    method: 'updatePass',
    path: '/User/updatePass',
    type: 'post'
  },
  {
    name: '设置权限',
    method: 'updateUserAccess',
    path: '/User/updateUserAccess',
    type: 'post'
  },
  {
    name: '设置用户状态',
    method: 'updateUserStatus',
    path: '/User/updateUserStatus',
    type: 'post'
  }
]
