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

// 查询线性图表信息【查询月份目标设定的目标值，完成值，通过值】
export function selectExpectActual(id) {
  return request({
    url: '/study/newWords/selectExpectActual/'+id,
    method: 'get'
  })
}

// 查询应战数据图表【应战数，成功数，失败数】
export function selectChallengeCollect(id,type) {
  return request({
    url: '/study/newWords/selectChallengeCollect/'+id+'/'+type,
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

// 新增生词
export function addChallenge(data) {
  return request({
    url: '/study/newWords/addChallenge',
    method: 'post',
    data: data
  })
}
