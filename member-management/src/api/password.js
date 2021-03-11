import request from '@/utils/request'

export default {
    //校验密码 用户id 旧密码
    checkPwd(userId, password) {
        return request({
            url: '/user/pwd',
            method: 'post',
            data() {
                return {
                    userId,
                    password
                }
            },
        })
    },
    //修改密码 用户id 新密码
    updatePwd(userId, password) {
        return request({
            url: '/user/pwd',
            method: 'put',
            data() {
                return {
                    userId,
                    password
                }
            },
        })
    }
}