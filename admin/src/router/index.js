const routers = [{
    path: '/login',
    meta: {
      title: "登录",
      noAuth: true
    },
    component: (resolve) => require(['../views/login.vue'], resolve),
  },
  {
    path: '/',
    component(resolve) {
      require(['../views/layout.vue'], resolve);
    },
    children: [{
        //todo: 首页
        path: '/',
        name: 'index',
        meta: {
          module: "/",
          title: '首页'
        },
        component(resolve) {
          require(['../views/index.vue'], resolve);
        }
      },
      //todo: 管理员
      {
        path: 'admin',
        name: 'admin',
        meta: {
          module: "/admin",
          group: "set",
          title: '管理员 - 列表'
        },
        component: (resolve) => require(['../views/admin/index.vue'], resolve),
      },
      // 用户
      {
        path: 'user',
        name: 'user',
        meta: {
          module: "/user",
          group: "set",
          title: '用户 - 列表'
        },
        component: (resolve) => require(['../views/user/list.vue'], resolve),
      },
      // 用户
      {
        path: 'org',
        name: 'org',
        meta: {
          module: "/org",
          group: "set",
          title: '用户 - 下拉树'
        },
        component: (resolve) => require(['../views/user/org.vue'], resolve),
      },
      {
        path: 'list',
        name: 'list',
        meta: {
          module: "/list",
          group: "equipment",
          title: '设备管理-添加'
        },
        component: (resolve) => require(['../views/equipment/list.vue'], resolve),
      },
      {
        path: 'listadd',
        name: 'listadd',
        meta: {
          module: "/listadd",
          group: "equipment",
          title: '设备管理-添加'
        },
        component: (resolve) => require(['../views/equipment/listadd.vue'], resolve),
      },
      {
        path: '/infrlist',
        name: 'infrlist',
        meta: {
          module: "/infrlist",
          group: "infrlist",
          title: '基建 - 列表'
        },
        component: (resolve) => require(['../views/infrastructure/list.vue'], resolve),
      },
      {
        //todo: 404
        path: '/403',
        name: '403',
        meta: {
          module: "/",
          title: '403 - 权限不足'
        },
        component(resolve) {
          require(['../views/403.vue'], resolve);
        }
      },
      {
        //todo: 404
        path: '*',
        name: '404',
        meta: {
          module: "/",
          title: '404 - 页面不存在'
        },
        component(resolve) {
          require(['../views/404.vue'], resolve);
        }
      }
    ]
  }
];

export default routers;
