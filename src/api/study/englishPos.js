import request from '@/utils/request'

// 查询英语单词-词性列表
export function listEnglishPos(query) {
  return request({
    url: '/study/englishPos/list',
    method: 'get',
    params: query
  })
}

// 查询英语单词-词性详细
export function getEnglishPos(id) {
  return request({
    url: '/study/englishPos/' + id,
    method: 'get'
  })
}

// 新增英语单词-词性
export function addEnglishPos(data) {
  return request({
    url: '/study/englishPos',
    method: 'post',
    data: data
  })
}

// 修改英语单词-词性
export function updateEnglishPos(data) {
  return request({
    url: '/study/englishPos',
    method: 'put',
    data: data
  })
}

// 删除英语单词-词性
export function delEnglishPos(id) {
  return request({
    url: '/study/englishPos/' + id,
    method: 'delete'
  })
}
