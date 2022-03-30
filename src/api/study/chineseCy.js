import request from '@/utils/request'

// 查询语文成语词典列表
export function listChineseCy(query) {
  return request({
    url: '/study/chineseCy/list',
    method: 'get',
    params: query
  })
}

// 查询语文成语词典详细
export function getChineseCy(id) {
  return request({
    url: '/study/chineseCy/' + id,
    method: 'get'
  })
}

// 新增语文成语词典
export function addChineseCy(data) {
  return request({
    url: '/study/chineseCy',
    method: 'post',
    data: data
  })
}

// 修改语文成语词典
export function updateChineseCy(data) {
  return request({
    url: '/study/chineseCy',
    method: 'put',
    data: data
  })
}

// 删除语文成语词典
export function delChineseCy(id) {
  return request({
    url: '/study/chineseCy/' + id,
    method: 'delete'
  })
}
