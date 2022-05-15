import request from '@/utils/request'

// 查询生词目标参数设置列表
export function listSetting(query) {
  return request({
    url: '/study/setting/list',
    method: 'get',
    params: query
  })
}

// 查询生词目标参数设置详细
export function getSetting(id) {
  return request({
    url: '/study/setting/' + id,
    method: 'get'
  })
}

// 新增生词目标参数设置
export function addSetting(data) {
  return request({
    url: '/study/setting',
    method: 'post',
    data: data
  })
}

// 修改生词目标参数设置
export function updateSetting(data) {
  return request({
    url: '/study/setting',
    method: 'put',
    data: data
  })
}

// 修改生词目标参数设置
export function editSettingBatch(data) {
  return request({
    url: '/study/setting/editBatch',
    method: 'post',
    data: data
  })
}



// 删除生词目标参数设置
export function delSetting(id) {
  return request({
    url: '/study/setting/' + id,
    method: 'delete'
  })
}
