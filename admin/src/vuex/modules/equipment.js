import equipment from '../../api/equipment'

const state = {}
const mutations = {}
const actions = {
    
  // 获取用户列表
  async getEquipmentList({
    state,
    commit
  }, params) {
    return equipment.list(params);
  },

  // 获取用户详情
  async getEquipment({
    state,
    commit
  }, params) {
    return equipment.detail(params);
  },

  // 创建用户
  async createEquipment({
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