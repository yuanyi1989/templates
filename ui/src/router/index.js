import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import {routers, otherRouter, appRouter} from './router';
import globalConfig from '../config'

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    //如果启用了SSO，判断是否为SSO服务的重定向请求
    if (globalConfig.ssoHost) {
        if (!document.referrer) {
            window.alert('wait');
            var originURL = window.location.href;
            window.location.href = globalConfig.ssoHost+globalConfig.ssoBaseUri
                +'?redirectURL='+encodeURIComponent(originURL);
            return;
        }
        var host = Util.domainURI(document.referrer);
        if (globalConfig.ssoHost === host) {
            //获取SSO的票据
            var ticket = Util.getQueryStringByName(globalConfig.ssoTicketName);
            var roleCode = Util.getQueryStringByName('roleCode');
            if (ticket && ticket.length > 6) {
                //保存票据
                Cookies.set(globalConfig.ssoTicketName, ticket);
                Cookies.set(globalConfig.lastLoginCheckKey, new Date());
                Cookies.set('roleCode', roleCode);
            } else {
                //票据错误，提示信息有误
                this.$Message.error({
                    showClose: true,
                    content: '登录异常，无法获取用户信息',
                    duration: 10
                });
                next(false);
            }
        }
    }

    //1，判断是否登录
    var ticket = Cookies.get(globalConfig.ssoTicketName);
    if (!ticket) {
        //未登录
        if (globalConfig.ssoHost) {
            //跳转到sso服务器
            var originURL = window.location.href;
            window.location.href = globalConfig.ssoHost+globalConfig.ssoBaseUri
                +'?redirectURL='+encodeURIComponent(originURL);
        } else {
            //跳转到本应用的登录界面
            if (to.name !== 'login') {
                next({
                    name: 'login'
                });
            } else {
                Util.toDefaultPage([...routers], to.name, router, next);
            }
            return;
        }
    }
    //2，已登录，检查上次检查登录状态的时间是否超过一分钟
    var lastCheck = Cookies.get(globalConfig.lastLoginCheckKey);
    if (!lastCheck) {
        // 未登录，跳转到登录界面
        if (to.name !== 'login') {
            next({
                name: 'login'
            });
        } else {
            Util.toDefaultPage([...routers], to.name, router, next);
        }
        return;
    }

    var now = new Date();
    var diff = Util.getMinDiff(lastCheck, now);

    //3, 如果超过一分钟，请求服务端检查token是否过期
    if (diff > 1) {
        router.app.$$api_user_isLoggedIn({
            data: {},
            fn: data => {
                //检测成功， 设置最后检测时间， 如果检测失败，ajax通信层将处理跳转到sso或者登录界面
                Cookies.set(globalConfig.lastLoginCheckKey, new Date());
                console.log('login check pass');
            },
            errFn: (err) => {
                this.$Message.warning(err.msg);
            },
            tokenFlag: true
        });
    }

    iView.LoadingBar.start();
    Util.title(to.meta.title);
    if (Cookies.get('locking') === '1' && to.name !== 'locking') { // 判断当前是否是锁定状态
        next({
            replace: true,
            name: 'locking'
        });
    } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
        next(false);
    } else {
        if (Cookies.get(globalConfig.ssoTicketName) && to.name === 'login') { // 判断是否已经登录且前往的是登录页
            Util.title();
            next({
                name: 'home_index'
            });
        } else {
            const curRouterObj = Util.getRouterObjByName([otherRouter, ...appRouter], to.name);
            if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
                if (Cookies.get('roleCode').indexOf(curRouterObj.access)) {
                    Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
                } else {
                    next({
                        replace: true,
                        name: 'error-403'
                    });
                }
            } else { // 没有配置权限的路由, 直接通过
                Util.toDefaultPage([...routers], to.name, router, next);
            }
        }
    }
});

router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
