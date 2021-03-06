import request from '@/utils/request';

export function login(username, password) {
    return request({
        method: 'post',
        url: '/user/login',
        data: {
            username,
            password
        },
    })
}

export function getUserInfo(token) {
    return request({
        method: 'get',
        url: `/user/info/${token}`,
    })
}