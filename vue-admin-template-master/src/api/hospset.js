import request from '@/utils/request'

// export default {
//   getHospSetList(current, limit, searchObj) {
//     return request({
//       url: `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
//       method: 'post',
//       data: searchObj // 使用json格式传递值
//     })
//   }
// }

// 查询医院设置列表
export function getHospSetList(current, limit, searchObj) {
  return request({
    url: `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
    method: 'post',
    data: searchObj // 使用json格式传递值
  })
}
// 删除医院设置
export function deleteHospSet(id) {
  return request({
    url: `/admin/hosp/hospitalSet/${id}`,
    method: 'delete'
  })
}

// 批量删除
export function batchHospSet(idList) {
  return request({
    url: `/admin/hosp/hospitalSet/batchRemove`,
    method: 'delete',
    data: idList // Json数据
  })
}

// 锁定和取消锁定
export function lockHospSet(id, status) {
  return request({
    url: `/admin/hosp/hospitalSet/lockHsopitalSet/${id}/${status}`,
    method: 'put'
  })
}

// 添加医院设置信息
export function saveHospSet(hospitalSet) {
  return request({
    url: `/admin/hosp/hospitalSet/saveHospitalSet`,
    method: 'post',
    data: hospitalSet
  })
}

// 根据id查询医院信息
export function getHospSet(id) {
  return request({
    url: `/admin/hosp/hospitalSet/getHospitalSet/${id}`,
    method: 'get'
  })
}

// 修改医院设置信息
export function updateHospSet(hospitalSet) {
  return request({
    url: `/admin/hosp/hospitalSet/updateHospitalSet`,
    method: 'post',
    data: hospitalSet
  })
}
