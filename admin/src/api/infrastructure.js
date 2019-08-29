import fetch from './fetch';

export default {
  // 获取列表
  getList(params) {
    return fetch.get('/infrastructure/getList', params)
  },

  // 更新
  update(params) {
    return fetch.put('/infrastructure/update', params)
  },

  // 删除
  destroy(id) {
    return fetch.delete('/infrastructure/remove')
  },

  // 创建
  create(params) {
    return fetch.post('/infrastructure/save', params);
  },

  // 详情
  getInfo(params) {
    return fetch.post('/infrastructure/getInfo', params);
  }
}
