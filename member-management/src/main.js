import Vue from "vue";
import ElementUI from 'element-ui'; //ElementUI组件库
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(ElementUI); //使用ElementUI

//权限拦截
import './premission'

Vue.config.productionTip = process.env.NODE_ENV === 'production';


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");