import AdminController from '@/services/admin';
import { message } from 'antd';

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
  namespace: 'admin',
  state: {
    adminList: [],
    adminInfo: null, // 当前登录的管理员信息
  } as UserState,
  // 外部派发的 action
  reducers: {
    initAdminList(state: UserState, action: Action<any[]>) {
      return { ...state, adminList: action.payload };
    },
    // 删除管理员
    deleteAdmin(state: UserState, action: Action<string>) {
      const newState = { ...state };
      const index = newState.adminList.indexOf(action.payload);
      const arr = [...newState.adminList];
      arr.splice(index, 1);
      newState.adminList = arr;
      return newState;
    },
    // 更新管理员信息
    updateAdmin(
      state: UserState,
      action: Action<{ adminInfo: any; newAdminInfo: any }>,
    ) {
      const newState = { ...state };
      newState.adminList = newState.adminList.map((admin) => {
        if (admin._id === action.payload.adminInfo._id) {
          return { ...admin, ...action.payload.newAdminInfo };
        }
        return admin;
      });
      return newState;
    },
    // 新增管理员
    addAdmin(state: UserState, action: Action<any>) {
      console.log(action.payload);
      const newState = { ...state };
      const arr = [...newState.adminList];
      arr.push(action.payload);
      newState.adminList = arr;
      console.log(newState);
      return newState;
    },
  },
  // 异步操作
  effects: {
    *_initAdminList(action: Action, { call, put }: any) {
      try {
        const { data } = yield call(AdminController.getAdminList);
        yield put({
          type: 'initAdminList',
          payload: data,
        });

        // 如果存在回调函数，执行回调
        if (typeof action.callback === 'function') {
          action.callback();
        }
      } catch (error) {
        message.error('获取管理员列表失败');
      }
    },
    // 删除一个管理员
    *_deleteAdmin({ payload, callback }: Action, { put, call }: any) {
      console.log(payload);
      try {
        // 和服务器进行通信，删除服务器上面的数据
        yield call(AdminController.deleteAdmin, payload._id);
        // 更新本地仓库
        yield put({
          type: 'deleteAdmin',
          payload,
        });
        // 如果存在回调函数，执行回调
        if (typeof callback === 'function') {
          callback();
        }
      } catch (error) {
        message.error('删除管理员失败');
      }
    },
    // 新增管理员信息
    *_addAdmin({ payload, callback }: Action, { put, call }: any) {
      try {
        // 和服务器通信
        const { data } = yield call(AdminController.addAdmin, payload);
        // 调用 reducer 的方法更新本地状态仓库
        yield put({
          type: 'addAdmin',
          payload: data,
        });
        // 如果存在回调函数，执行回调
        if (typeof callback === 'function') {
          callback();
        }
      } catch (error) {
        message.error('新增管理员失败');
      }
    },
    // 更新管理员信息
    *_updateAdmin({ payload, callback }: Action, { put, call }: any) {
      try {
        yield call(
          AdminController.updateAdmin,
          payload.adminInfo._id,
          payload.newAdminInfo,
        );
        yield put({
          type: 'updateAdmin',
          payload,
        });
        // 如果存在回调函数，执行回调
        if (typeof callback === 'function') {
          callback();
        }
      } catch (error) {
        message.error('更新管理员信息失败');
      }
    },
  },
};
