import request from '@/utils/request'

// 查询医院设置列表
export function getHospList(page, limit, searchObj) {
  return request({
    url: `/admin/hosp/hospital/list/${page}/${limit}`,
    method: 'get',
    params: searchObj
  })
}

// 根据dictcode查询所有的子节点 （查询所有省）

export function findByDictCode(dictCode) {
  return request({
    url: `/admin/cmn/dict/findByDictCode/${dictCode}`,
    method: 'get'
  })
}

// 根据省查询市
export function findChildId(id) {
  return request({
    url: `/admin/cmn/dict/findChildData/${id}`,
    method: 'get'
  })
}

export function updateStatus(id, status) {
  return request({
    url: `/admin/hosp/hospital/updateHospStatus/${id}/${status}`,
    method: 'get'
  })
}

