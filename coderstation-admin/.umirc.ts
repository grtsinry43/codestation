import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  dva: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'CoderStation Admin',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
      access: 'NormalAdmin',
    },
    {
      name: '首页',
      path: '/home',
      icon: 'HomeOutlined',
      component: './Home',
      access: 'NormalAdmin',
    },
    {
      name: '管理员',
      path: '/admin',
      icon: 'UserOutlined',
      access: 'SuperAdmin',
      routes: [
        {
          name: '管理员列表',
          path: '/admin/list',
          component: './Admin',
          access: 'SuperAdmin',
        },
        {
          name: '添加管理员',
          path: '/admin/add',
          component: './Admin/AddAdmin',
          access: 'SuperAdmin',
        },
      ],
    },
    {
      name: '用户管理',
      path: '/user',
      icon: 'TeamOutlined',
      access: 'NormalAdmin',
      routes: [
        {
          name: '用户列表',
          path: '/user/list',
          component: './User',
          access: 'NormalAdmin',
        },
        {
          name: '添加用户',
          path: '/user/add',
          component: './User/AddUser',
          access: 'NormalAdmin',
        },
        {
          name: '修改用户',
          path: '/user/edit/:id',
          component: './User/EditUser',
          hideInMenu: true,
          access: 'NormalAdmin',
        },
      ],
    },
    {
      name: '书籍',
      path: '/book',
      icon: 'ReadOutlined',
      access: 'NormalAdmin',
      routes: [
        {
          path: '/book/list',
          name: '书籍列表',
          component: './Book',
          access: 'NormalAdmin',
        },
        {
          path: '/book/add',
          name: '添加书籍',
          component: './Book/AddBook',
          access: 'NormalAdmin',
        },
        {
          path: '/book/edit/:id',
          name: '编辑书籍',
          component: './Book/EditBook',
          hideInMenu: true,
          access: 'NormalAdmin',
        },
      ],
    },
    {
      name: '面试题',
      path: '/interview',
      icon: 'EditOutlined',
      component: './Interview',
      access: 'NormalAdmin',
    },
    {
      name: '问答',
      path: '/issue',
      icon: 'ProfileOutlined',
      component: './Issue',
      access: 'NormalAdmin',
    },
    {
      name: '评论',
      path: '/comment',
      icon: 'CalendarOutlined',
      component: './Comment',
      access: 'NormalAdmin',
    },
    {
      name: '类型',
      path: '/type',
      component: './Type',
      icon: 'AppstoreOutlined',
      access: 'NormalAdmin',
    },
    {
      name: '登录',
      path: '/login',
      component: './Login',
      hideInMenu: true,
      menuRender: false,
    },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
    '/static': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
    '/res': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
  },
});
