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
  }
];
export {
  menus
};
