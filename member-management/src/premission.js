/**
 * 权限校验：
 * VueRouter 中的 前置钩子函数 beforeEach（to ， from  ， next）
 * 当进行路由跳转之前，进行判断 是否已经登录过， 登陆过则允许访问非登录页面， 否则 回到登录页
 * 
 * to:即将要进入的目标路由对象
 * from：即将要离开的路由对象
 * next：是一个方法，可以指定路由地址 进行路由跳转
 */

import router from './router/index'
import { getUserInfo } from './api/login'

router.beforeEach((to, from, next) => {

    //1.获取token
    //如果没有获取到，则回到登录页/login
    //如果获取到token，1.亲求的路由/login 2.请求路由非登录页面，就通过token去获取用户信息，如果获取到用户信息，则进行非登录页面，否则回到登录页
    const token = localStorage.getItem('mxg-msm-token');
    if (!token) {
        if (to.path != '/login') {
            next({ path: './login' });
        } else {
            next();
        }
    } else {
        if (to.path === './login') {
            next()
        } else {
            const userInfo = localStorage.getItem('mxg-msm-user');
            if (userInfo) {
                next()
            } else {
                getUserInfo(token).then(response => {
                    const resp = response.data
                    if (resp.flag) {
                        localStorage.setItem('mxg-msm-user', JSON.stringify(resp.data));
                        next();
                    } else {
                        next({ path: './login.' })
                    }
                })
            }
        }
    }


})