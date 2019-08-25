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
      icon: "md-contacts",
      name: "用户列表",
      path: "/admin"
    }]
  },
  {
    name: "用户管理",
    path: "user",
    icon: "md-list-box",
    children: [{
        name: "用户列表",
        path: "/user",
        icon: "md-list"
      }
    ]
  },
  //   {
  //     name: "分类管理",
  //     path: "category",
  //     icon: "md-move",
  //     children: [{
  //         name: "分类列表",
  //         path: "/category",
  //         icon: "md-list"
  //       },
  //       {
  //         name: "分类创建",
  //         path: "/category/create",
  //         icon: "md-add-circle"
  //       }
  //     ]
  //   },

  //   {
  //     name: "评论管理",
  //     path: "comments",
  //     icon: "md-text",
  //     children: [{
  //       name: "评论列表",
  //       path: "/comments",
  //       icon: "md-list"
  //     }]
  //   }

];
export {
  menus
};
