import request from '@/utils/request'

// 根据id查询数据字典
export function dictList(id) {
  return request({
    url: `admin/cmn/dict/findChildData/${id}`,
    method: `get`
  })
}
