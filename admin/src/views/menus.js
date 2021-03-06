/**
 * 管理员菜单
 * @type {*[]}
 */

// 查看菜单列表
const menus = [{
    name: "首页",
    path: "/",
    icon: "ios-navigate"
  },
  // 系统管理
  {
    name: "系统管理",
    path: "set",
    icon: "ios-cog",
    children: [{
      name: "用户列表",
      path: "/user",
      icon: "md-list"
    }, {
      name: "下拉树",
      path: "/org",
      icon: "md-list"
    }]
  },
  //设备管理
  {
    name: "设备管理",
    path: "equipment",
    icon: "ios-cog",
    children: [{
      icon: "md-contacts",
      name: "设备添加",
      path: "/list"
    }]
  },
  // 系统管理  t_mda_infrastructure
  {
    name: "基建管理",
    path: "infrastructure",
    icon: "ios-cog",
    children: [{
      name: "基建列表",
      path: "/infrlist",
      icon: "md-list"
    }, {
      name: "基建添加",
      path: "/infrAdd",
      icon: "md-list"
    }]
  }
];
export {
  menus
};
