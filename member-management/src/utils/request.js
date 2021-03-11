import axios from 'axios';
import { Loading, Message } from 'element-ui';



const loading = {
    loadingInstance: null, //loading实列
    open: function() {
        if (this.loadingInstance === null) {
            this.loadingInstance = Loading.service({
                target: '.main',
                text: '拼命加载中',
                background: 'rgba(0,0,0,0.5)'
            })
        }

    },
    close: function() {
        if (this.loadingInstance !== null) {
            this.loadingInstance.close()

        }
        this.loadingInstance = null
    }
}

const request = axios.create({
    //baseURL: '/', //基础路径
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000, //请求超时
})

//请求拦截器
request.interceptors.request.use(config => {
    loading.open()
        //请求拦截
    return config
}, error => {
    loading.close()
    return Promise.reject(error);
});
//响应拦截器
request.interceptors.response.use(response => {
    loading.close()
        //response.data
    const resp = response.data
    Message({
        message: resp.message || '系统异常',
        type: 'warning',
        duration: 5 * 1000
    })
    if (resp.code !== 2000) {

    }
    return response;
}, error => {
    loading.close()
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error);
})


// request.get('/db.json').then(response => {
//     const data = response.data
//     console.log(data);
// })

export default request // 导出自定义 axiois对象