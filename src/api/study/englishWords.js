import request from '@/utils/request'

// 查询英语单词列表
export function listEnglishWords(query) {
  return request({
    url: '/study/englishWords/list',
    method: 'get',
    params: query
  })
}

// 查询英语单词详细
export function getEnglishWords(id) {
  return request({
    url: '/study/englishWords/' + id,
    method: 'get'
  })
}

// 新增英语单词
export function addEnglishWords(data) {
  return request({
    url: '/study/englishWords',
    method: 'post',
    data: data
  })
}

// 修改英语单词
export function updateEnglishWords(data) {
  return request({
    url: '/study/englishWords',
    method: 'put',
    data: data
  })
}

// 删除英语单词
export function delEnglishWords(id) {
  return request({
    url: '/study/englishWords/' + id,
    method: 'delete'
  })
}
