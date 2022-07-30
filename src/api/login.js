import request from '@/utils/request'

const client_id = 'web'
const client_secret = '123456'
const scope = 'server'

// 登录方法
export function login(username, password, code, uuid) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: { username, password, code, uuid }
  })
}

// 刷新方法
export function refreshToken() {
  return request({
    url: '/auth/refresh',
    method: 'post'
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/system/user/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'delete'
  })
}

// 获取验证码
export function getCodeImg(codeType) {
  return request({
    url: '/code?codeType='+codeType,
    method: 'get' 
  })
}


// 注册用户
export function register(data) {
  //alert('regitser');
  return request({
    url: '/auth/register',
    method: 'post',
    data: data
  })
}


// 检测微信扫码后台是否完成token
export function checkIsWxMapLogin(uuid) {
  //alert('checkIsSanLogin');
  return request({
    url: '/auth/checkIsWxMapLogin/'+uuid,
    method: 'get'
  })
}


// 密码重置邮件发送
export function resetPwdEmail(data) {
  //alert('resetPwdEmail');
  return request({
    url: '/auth/resetPwdEmail',
    method: 'post',
    data: data
  })
}


// 密码重置
export function resetPwd(data) {
  //alert('resetPwdEmail');
  return request({
    url: '/auth/resetPwd',
    method: 'post',
    data: data
  })
}

// 注册用户
// export function loginWeixin(uuid) {
//   //alert('loginWeixin');
//   return request({
//     url: '/auth/checkIsSanLogin/'+uuid,
//     method: 'get'
//   })
// }