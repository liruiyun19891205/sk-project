import fetch from './fetch';

export default {
  // 获取文章列表
  list(params) {
    return fetch.get('/getUserList', params)
  },

  // 更新用户
  update(params) {
    const {
      id
    } = params;
    delete params.id;
    return fetch.put('/user/' + id, params)
  },

  // 删除文章
  destroy(id) {
    return fetch.delete('/user/' + id)
  },

  // 创建文章
  create(params) {
    return fetch.post('/user', params);
  }
}
