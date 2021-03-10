import request from '@/utils/request'

export default {
    getList() {
        return request({
            url: '/supplier/list',
            method: 'get'
        })
    },
    search(page, size, searchMap) {
        return request({
            url: `/supplier/list/search/${page}/${size}`,
            method: 'post',
            data: searchMap
        })
    },
    //新增会员
    add(pojo) {
        return request({
            url: `/supplier`,
            method: 'post',
            data: pojo
        })
    },
    //getById
    getById(id) {
        return request({
            url: `/supplier/${id}`,
            method: 'get'
        })
    },
    update(pojo) {
        return request({
            url: `/supplier/${pojo.id}`,
            method: 'put',
            data: pojo
        })
    },
    deleteById(id) {
        return request({
            url: `/supplier/${id}`,
            method: 'delete'
        })
    }

}