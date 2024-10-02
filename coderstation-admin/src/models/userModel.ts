import UserController from '@/services/admin';

interface UserState {
  adminList: any[];
  adminInfo: any | null;
}

interface Action<T = any> {
  callback: any;
  type: string;
  payload: T;
}

export default {
  namespace: 'user',
  state: {
    adminList: [],
    adminInfo: null, // 当前登录的管理员信息
  } as UserState,
  // 外部派发的 action
  reducers: {
    initAdminList(state: UserState, action: Action<any[]>) {
      return { ...state, adminList: action.payload };
    },
  },
  // 异步操作
  effects: {
    *_initAdminList(action: Action, { call, put }: any) {
      try {
        const { data } = yield call(UserController.getAdminList);
        yield put({
          type: 'initAdminList',
          payload: data,
        });

        // 如果存在回调函数，执行回调
        if (typeof action.callback === 'function') {
          action.callback();
        }
      } catch (error) {
        console.error('Error fetching admin list:', error);
        // 如果你有错误处理逻辑，可以在这里加上
      }
    },
  },
};
