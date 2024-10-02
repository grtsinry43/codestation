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
    },
    {
      name: '首页',
      path: '/home',
      icon: 'HomeOutlined',
      component: './Home',
    },
    {
      name: '管理员',
      path: '/admin',
      icon: 'UserOutlined',
      routes: [
        {
          name: '管理员列表',
          path: '/admin/list',
          component: './Admin',
        },
        {
          name: '添加管理员',
          path: '/admin/add',
          component: './Admin/AddAdmin',
        },
      ],
    },
    {
      name: '用户管理',
      path: '/user',
      icon: 'TeamOutlined',
      routes: [
        {
          name: '用户列表',
          path: '/user/list',
          component: './User',
        },
        {
          name: '添加用户',
          path: '/user/add',
          component: './User/AddUser',
        },
      ],
    },
    {
      name: '书籍',
      path: '/book',
      icon: 'ReadOutlined',
      routes: [
        {
          path: 'bookList',
          name: '书籍列表',
          component: './Book',
        },
        {
          path: '/book/add',
          name: '添加书籍',
          component: './Book/AddBook',
        },
      ],
    },
    {
      name: '面试题',
      path: '/interview',
      icon: 'EditOutlined',
      component: './Interview',
    },
    {
      name: '问答',
      path: '/issue',
      icon: 'ProfileOutlined',
      component: './Issue',
    },
    {
      name: '评论',
      path: '/comment',
      icon: 'CalendarOutlined',
      component: './Comment',
    },
    {
      name: '类型',
      path: '/type',
      component: './Type',
      icon: 'AppstoreOutlined',
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
