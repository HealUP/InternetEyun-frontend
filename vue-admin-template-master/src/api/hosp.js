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

// 更新医院状态
export function updateStatus(id, status) {
  return request({
    url: `/admin/hosp/hospital/updateHospStatus/${id}/${status}`,
    method: 'get'
  })
}

// 查看医院详情
export function showHospDetail(id) {
  return request({
    url: `/admin/hosp/hospital/showHospDetail/${id}`,
    method: 'get'
  })
}

// 查看医院科室
export function getSchedulByHoscode(hoscode) {
  return request({
    url: `/admin/hosp/department/getDeptList/${hoscode}`,
    method: 'get'
  })
}

// 查询预约规则
export function getScheduleRules(page, limit, hoscode, depcode) {
  return request({
    url: `/admin/hosp/schedule/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
    method: 'get'
  })
}

// 查询详细排班信息
export function getScheduleDetail(hoscode, depcode, workDate) {
  return request({
    url: `/admin/hosp/schedule/getScheduleDetail/${hoscode}/${depcode}/${workDate}`,
    method: 'get'
  })
}
