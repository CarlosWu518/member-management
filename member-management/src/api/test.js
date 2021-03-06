import request from '@/utils/request';

const BASE_URL = process.env.VUE_APP_BASE_API
    // request.get('/db.json').then(response => {
    //     console.log(response.data);
    // })

//以对象配置方式进行指定请求方式
// request({
//     methods: 'get',
//     url: BASE_URL + '/db.json',
// }).then(response => {
//     console.log('get2' + response.data);
// })

export default {
    getList() {
        const req = request({
            method: 'get',
            url: '/db.json'
        })
        return req
    }
}