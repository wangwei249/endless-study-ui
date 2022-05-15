import request from '@/utils/request'

// 查询生词朋友表列表
export function listFriends(query) {
  return request({
    url: '/study/friends/list',
    method: 'get',
    params: query
  })
}

// 查询生词朋友表列表
export function listFriendsTwoWay(query) {
  return request({
    url: '/study/friends/listTwoWay',
    method: 'get',
    params: query
  })
}

// 查询生词朋友表详细
export function getFriends(id) {
  return request({
    url: '/study/friends/' + id,
    method: 'get'
  })
}

// 新增生词朋友表
export function addFriends(data) {
  return request({
    url: '/study/friends',
    method: 'post',
    data: data
  })
}

// 修改生词朋友表
export function updateFriends(data) {
  return request({
    url: '/study/friends',
    method: 'put',
    data: data
  })
}

// 删除生词朋友表
export function delFriends(id) {
  return request({
    url: '/study/friends/' + id,
    method: 'delete'
  })
}
