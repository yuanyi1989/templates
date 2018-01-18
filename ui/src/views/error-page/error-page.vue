<style lang="less">
    @import '../../styles/common.less';
    @import './error-page.less';
</style>

<template>
    <div class="error-page">
        <Row>
            <Card>
                <p slot="title">
                    <Icon :size="14" type="ios-navigate-outline"></Icon>
                    404-页面不存在
                </p>
                <Row>
                    <Col span="10">
                        <Card dis-hover>
                            <Row>
                                <div class="error-page-show">
                                    <error404></error404>
                                </div>
                                <div class="error-page-cover"></div>
                            </Row>
                        </Card>
                    </Col>
                    <Col span="14" class="padding-left-10">
                        <Row type="flex" align="middle" class="error-page-intro-con">
                            <p>当访问的页面不存在时会跳转到404页面，您可以在浏览器地址栏中修改url为一个不存在的路径，体验一下效果</p>
                            <Button @click="handle404" type="primary" long>点击跳转</Button>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title">
                    <Icon :size="14" type="android-lock"></Icon>
                    403-权限不足
                </p>
                <Row>
                    <Col span="10">
                        <Card dis-hover>
                            <Row>
                                <div class="error-page-show">
                                    <error403></error403>
                                </div>
                                <div class="error-page-cover"></div>
                            </Row>
                        </Card>
                    </Col>
                    <Col span="14" class="padding-left-10">
                        <Row type="flex" align="middle" class="error-page-intro-con">
                            <p>在当前登录用户不具有执行当前操作的权限时跳转到该页面，您可以在ajax请求方法中判断返回的状态码为403时跳转到该页面</p>
                            <Button @click="handle403" type="primary" long>点击跳转</Button>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title">
                    <Icon :size="14" type="social-freebsd-devil"></Icon>
                    500-服务端错误
                </p>
                <Row>
                    <Col span="10">
                        <Card dis-hover>
                            <Row>
                                <div class="error-page-show">
                                    <error500></error500>
                                </div>
                                <div class="error-page-cover"></div>
                            </Row>
                        </Card>
                    </Col>
                    <Col span="14" class="padding-left-10">
                        <Row type="flex" align="middle" class="error-page-intro-con">
                            <p>当请求之后出现服务端错误时跳转到该页面，您可以在ajax请求方法中判断返回的状态码为500时跳转到该页面</p>
                            <Button @click="handle500" type="primary" long>点击跳转</Button>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title">
                    <Icon :size="14" type="social-freebsd-devil"></Icon>
                    0-服务端错误
                </p>
                <Row>
                    <Col span="10">
                    <Card dis-hover>
                        <Row>
                            <div class="error-page-show">
                                <error500></error500>
                            </div>
                            <div class="error-page-cover"></div>
                        </Row>
                    </Card>
                    </Col>
                    <Col span="14" class="padding-left-10">
                    <Row type="flex" align="middle" class="error-page-intro-con">
                        <p>当请求之后出现服务端错误时跳转到该页面，您可以在ajax请求方法中判断返回的状态码为500时跳转到该页面</p>
                        <Button @click="handle0" type="primary" long>点击跳转</Button>
                    </Row>
                    </Col>
                </Row>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title">
                    <Icon :size="14" type="social-freebsd-devil"></Icon>
                    1-服务端错误
                </p>
                <Row>
                    <Col span="10">
                    <Card dis-hover>
                        <Row>
                            <div class="error-page-show">
                                <error500></error500>
                            </div>
                            <div class="error-page-cover"></div>
                        </Row>
                    </Card>
                    </Col>
                    <Col span="14" class="padding-left-10">
                    <Row type="flex" align="middle" class="error-page-intro-con">
                        <p>当请求之后出现服务端错误时跳转到该页面，您可以在ajax请求方法中判断返回的状态码为500时跳转到该页面</p>
                        <Button @click="handle1" type="primary" long>点击跳转</Button>
                    </Row>
                    </Col>
                </Row>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title">
                    <Icon :size="14" type="social-freebsd-devil"></Icon>
                    2-服务端错误
                </p>
                <Row>
                    <Col span="10">
                    <Card dis-hover>
                        <Row>
                            <div class="error-page-show">
                                <error500></error500>
                            </div>
                            <div class="error-page-cover"></div>
                        </Row>
                    </Card>
                    </Col>
                    <Col span="14" class="padding-left-10">
                    <Row type="flex" align="middle" class="error-page-intro-con">
                        <p>当请求之后出现服务端错误时跳转到该页面，您可以在ajax请求方法中判断返回的状态码为500时跳转到该页面</p>
                        <Button @click="handle2" type="primary" long>点击跳转</Button>
                    </Row>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
import Error404 from './404.vue';
import Error500 from './500.vue';
import Error403 from './403.vue';
export default {
    components: {
        Error404,
        Error500,
        Error403
    },
    methods:{
        handle404() {
            this.$$api_user_login404({
                data: {},
                fn: data => {
                    console.log(data);
                },
                errFn: (err) => {
                    this.$Message.warning(err.msg);
                }
            });
        },
        handle403() {
            this.$$api_user_login403({
                data: {},
                fn: data => {
                    console.log(data);
                },
                errFn: (err) => {
                    this.$Message.warning(err.msg);
                }
            });
        },
        handle500() {
            this.$$api_user_login500({
                data: {},
                fn: data => {
                    console.log(data);
                },
                errFn: (err) => {
                    this.$Message.warning(err.msg);
                }
            });
        },
        handle0() {
            this.$$api_user_login0({
                data: {},
                fn: data => {
                    console.log(data);
                },
                errFn: (err) => {
                    this.$Message.warning(err.msg);
                }
            });
        },
        handle1() {
            this.$$api_user_login1({
                data: {},
                fn: data => {
                    console.log(data);
                },
                errFn: (err) => {
                    this.$Message.warning(err.msg);
                }
            });
        },
        handle2() {
            this.$$api_user_login2({
                data: {},
                fn: data => {
                    console.log(data);
                },
                errFn: (err) => {
                    this.$Message.warning(err.message);
                }
            });
        }
    }
};
</script>
