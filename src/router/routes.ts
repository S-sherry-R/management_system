//路由配置：常量路由
export const constanRoute = [
  {
    //登录
    path:'/login',
    component: ()=>import('@/views/login/index.vue'),
    name: 'Login',
    meta: {
      isShow: false,
      title: '登录'
    }
  },
  {
    path: '/',
    component: ()=>import('@/layout/index.vue'),
    name: 'Layout',
    redirect: '/home',
    meta: {
      isShow: true,
      title: '首页',
      icon: 'HomeFilled',
      hiddenChildren: true,
      childrenPath: '/home'
    },
    children: [
      {
        path: '/home',
        component: ()=>import('@/views/home/index.vue'),
        name: 'Home',
        meta: {
          isShow: false,
        },
      },
    ]
  },
  {
    path: '/404',
    component: ()=>import('@/views/404/index.vue'),
    name: '404',
    meta: {
      isShow: false,
      title: '404'
    }
  },
]
//异步路由
export const asyncRoute = [
  {
    path: '/permission',
    component: ()=>import('@/layout/index.vue'),
    name: 'Permission',
    redirect: '/permission/user',
    meta: {
      isShow: true,
      title: '权限管理',
      icon: 'Lock',
      hiddenChildren: false
    },
    children: [
      {
        path: '/permission/user',
        component: ()=>import('@/views/permission/user/index.vue'),
        name: 'User',
        meta: {
          isShow: true,
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        path: '/permission/role',
        component: ()=>import('@/views/permission/role/index.vue'),
        name: 'Role',
        meta: {
          isShow: true,
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: '/permission/menu',
        component: ()=>import('@/views/permission/menu/index.vue'),
        name: 'Menu',
        meta: {
          isShow: true,
          title: '菜单管理',
          icon: 'List',
        },
      }
    ]
  },
  {
    path: '/supervise',
    component: () => import('@/layout/index.vue'),
    name: 'Supervise',
    redirect: '/supervise/person',
    meta: {
      isShow: true,
      title: '主题监管',
      icon: 'Help',
      hiddenChildren: false
    },
    children: [
      {
        path: '/supervise/person',
        component: ()=>import('@/views/supervise/person/index.vue'),
        name: 'Person',
        meta: {
          isShow: true,
          title: '人员监管',
          icon: 'View',
        },
      },
      {
        path: '/supervise/inspiration',
        component: ()=>import('@/views/supervise/inspiration/index.vue'),
        name: 'Inspiration',
        meta: {
          isShow: true,
          title: '灵感监管',
          icon: 'MagicStick',
        },
      },
    ]
  },
  {
    path: '/staff',
    component: () => import('@/layout/index.vue'),
    name: 'Staff',
    redirect: '/staff/basicInfo',
    meta: {
      isShow: true,
      title: '人员管理',
      icon: 'Files',
      hiddenChildren: false
    },
    children: [
      {
        path: '/staff/basicInfo',
        component: ()=>import('@/views/staff/basicInfo/index.vue'),
        name: 'BasicInfo',
        meta: {
          isShow: true,
          title: '基础信息',
          icon: 'Box',
        },
      },
    ]
  }
]
//任意路由
export const anyRoute =   {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'Any',
  meta: {
    isShow: false,
    title: '任意路由'
  }
}
