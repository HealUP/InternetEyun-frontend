import request from '@/utils/request'

// 分页查询
export default {
 getPageList(page, limit, searchObj) {
    return request({
        url: `/api/hosp/hospital/findHospList/${page}/${limit}`,
        method: 'get',
        params: searchObj
    })
  },
// 根据名字获取
 getByHosName(hosname) {
    return request({
        url: `/api/hosp/hospital/findByHosName/${hosname}`,
        method: 'get'
    })
  }
}
