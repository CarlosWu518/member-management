import axios from 'axios';

const request = axios.create({
    //baseURL: '/', //基础路径
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000, //请求超时
})

//请求拦截器
request.interceptors.request.use(config => {
    //请求拦截
    return config
}, error => {
    return Promise.reject(error);
});
//响应拦截器
request.interceptors.response.use(response => {
    //response.data
    return response;
}, error => {
    return Promise.reject(error);
})


// request.get('/db.json').then(response => {
//     const data = response.data
//     console.log(data);
// })

export default request // 导出自定义 axiois对象