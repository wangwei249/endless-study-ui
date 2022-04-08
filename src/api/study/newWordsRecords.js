import request from '@/utils/request'

// 查询生词练习记录列表
export function listNewWordsRecords(query) {
  return request({
    url: '/study/newWordsRecords/list',
    method: 'get',
    params: query
  })
}

// 查询生词练习记录详细
export function getNewWordsRecords(id) {
  return request({
    url: '/study/newWordsRecords/' + id,
    method: 'get'
  })
}

// 新增生词练习记录
export function addNewWordsRecords(data) {
  return request({
    url: '/study/newWordsRecords',
    method: 'post',
    data: data
  })
}

// 修改生词练习记录
export function updateNewWordsRecords(data) {
  return request({
    url: '/study/newWordsRecords',
    method: 'put',
    data: data
  })
}

// 删除生词练习记录
export function delNewWordsRecords(id) {
  return request({
    url: '/study/newWordsRecords/' + id,
    method: 'delete'
  })
}
