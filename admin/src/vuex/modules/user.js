import user from '../../api/user'

const state = {}
const mutations = {}
const actions = {
    
  // 获取用户列表
  async getUserList({
    state,
    commit
  }, params) {
    return user.list(params);
  },

  // 获取用户详情
  async getUser({
    state,
    commit
  }, params) {
    return user.detail(params);
  },

  // 创建用户
  async saveUser({
    state,
    commit
  }, params) {
    return user.create(params);
  },

  // 更新用户
  async updateUser({
    state,
    commit
  }, params) {
    return user.update(params);
  },

  // 删除用户
  async destroyUser({
    state,
    commit
  }, id) {
    return user.destroy(id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
