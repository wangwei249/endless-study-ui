import request from '@/utils/request'

// 查询英语单词列表
export function listWordsMean(query) {
  return request({
    url: '/study/wordsMean/list',
    method: 'get',
    params: query
  })
}

// 查询英语单词详细
export function getWordsMean(wordid) {
  return request({
    url: '/study/wordsMean/' + wordid,
    method: 'get'
  })
}

// 新增英语单词
export function addWordsMean(data) {
  return request({
    url: '/study/wordsMean',
    method: 'post',
    data: data
  })
}

// 修改英语单词
export function updateWordsMean(data) {
  return request({
    url: '/study/wordsMean',
    method: 'put',
    data: data
  })
}

// 删除英语单词
export function delWordsMean(wordid) {
  return request({
    url: '/study/wordsMean/' + wordid,
    method: 'delete'
  })
}
