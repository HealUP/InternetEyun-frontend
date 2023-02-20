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
    method: `delete`
  })
}
