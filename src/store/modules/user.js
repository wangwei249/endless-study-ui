import { login, register,logout, getInfo, refreshToken,checkIsWxMapLogin,resetPwdEmail,resetPwd } from '@/api/login'
import { getToken, setToken, setExpiresIn, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    nick: '',
    deptname: '',
    id: '',
    avatar: '',
    validTo: '',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_EXPIRES_IN: (state, time) => {
      state.expires_in = time
    },
    SET_NAME: (state, name) => {
      state.name = name
    }, 
    SET_NICK: (state, nick) => {
      state.nick = nick
    },
    SET_DEPTNAME: (state, deptname) => {
      state.deptname = deptname
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_VALID_TO: (state, validTo) => {
      state.validTo = validTo
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid).then(res => {
          //alert(uuid);
          let data = res.data 
          //alert(data.access_token);
          setToken(data.access_token)
          commit('SET_TOKEN', data.access_token)
          setExpiresIn(data.expires_in)
          commit('SET_EXPIRES_IN', data.expires_in)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登录【微信扫码后，前台轮询登录】
    LoginWeixin({ commit }, uuid) { 
      return new Promise((resolve, reject) => { 
        checkIsWxMapLogin(uuid).then(res => {
          //alert(uuid);
          let data = res.data 
          //alert(data.access_token);
          setToken(data.access_token)
          commit('SET_TOKEN', data.access_token)
          setExpiresIn(data.expires_in)
          commit('SET_EXPIRES_IN', data.expires_in)
          resolve() 
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 注册用户
    Register({ commit }, userInfo) { 
      return new Promise((resolve, reject) => {
        register(userInfo).then(res => {
          // let data = res.data
          // setToken(data.access_token)
          // commit('SET_TOKEN', data.access_token)
          // setExpiresIn(data.expires_in)
          // commit('SET_EXPIRES_IN', data.expires_in)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 密码重置邮件发送
    ResetPwdEmail({ commit }, emailAddress) { 
      return new Promise((resolve, reject) => {
        resetPwdEmail(emailAddress).then(res => {
          // let data = res.data
          // setToken(data.access_token)
          // commit('SET_TOKEN', data.access_token)
          // setExpiresIn(data.expires_in)
          // commit('SET_EXPIRES_IN', data.expires_in)
          resolve(res)
        }).catch(error => { 
          reject(error)
        })
      })
    },

    // 密码重置
    ResetPwd({ commit }, emailAddress) { 
      return new Promise((resolve, reject) => {
        resetPwd(emailAddress).then(res => {
          // let data = res.data
          // setToken(data.access_token)
          // commit('SET_TOKEN', data.access_token)
          // setExpiresIn(data.expires_in)
          // commit('SET_EXPIRES_IN', data.expires_in)
          resolve(res)
        }).catch(error => { 
          reject(error)
        })
      })
    },

    

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(res => {
          //alert(res.user.dept.deptName);
          const user = res.user
          //都使用了oss对象存储，不需要加process.env.VUE_APP_BASE_API 前缀了，否则访问不到 20220703
          const avatar = user.avatar == "" ? require("@/assets/image/profile.jpg") : user.avatar; 
          if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', user.userName)
          commit('SET_NICK', user.nickName)
          commit('SET_DEPTNAME', user.dept.deptName)
          commit('SET_ID', user.userId)
          commit('SET_AVATAR', avatar)
          commit('SET_VALID_TO', user.validTo)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 刷新token
    RefreshToken({commit, state}) {
      return new Promise((resolve, reject) => {
        refreshToken(state.token).then(res => {
          setExpiresIn(res.data)
          commit('SET_EXPIRES_IN', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
