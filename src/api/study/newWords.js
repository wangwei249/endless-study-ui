import request from '@/utils/request'

// 查询生词列表
export function listNewWords(query) {
  return request({
    url: '/study/newWords/list',
    method: 'get',
    params: query
  })
}

// 查询生词列表【随机查询一个练习】
export function listNewWordsRandom(query) {
  return request({
    url: '/study/newWords/listRandom',
    method: 'get',
    params: query
  })
}

// 查询生词汇总信息【总数，已消灭，未消灭】
export function selectNewWordsCollect(id) {
  return request({
    url: '/study/newWords/selectNewWordsCollect/'+id,
    method: 'get'
  })
}

// 查询生词详细
export function getNewWords(id) {
  return request({
    url: '/study/newWords/' + id,
    method: 'get'
  })
}

// 新增生词
export function addNewWords(data) {
  return request({
    url: '/study/newWords',
    method: 'post',
    data: data
  })
}

// 修改生词
export function updateNewWords(data) {
  return request({
    url: '/study/newWords',
    method: 'put',
    data: data
  })
}

// 删除生词
export function delNewWords(id) {
  return request({
    url: '/study/newWords/' + id,
    method: 'delete'
  })
}
