import fetch from './fetch';

export default {
  // 获取列表
  list(params) {
    return fetch.post('/equipment/list', params)
  },

  //设备添加
  listadd(params) {
    return fetch.post('/equipment/listadd', params)
  },

  // 验证管理员token
  //   auth(params) {
  //     return fetch.get('/admin/auth', params)
  //   }
}
