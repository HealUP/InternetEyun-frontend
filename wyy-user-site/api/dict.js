import request from '@/utils/request'

// const api_name = '/admin/cmn/dict'
// 
export default {
findByDictCode(dictCode) {
    return request({
        url: `/admin/cmn/dict/findByDictCode/${dictCode}`,
        method: 'get'
    })
  },
// 
findByParentId(parentId) {
    return request({
        url: `/admin/cmn/dict/findChildData/${parentId}`,
        method: 'get'
    })
  }
}
