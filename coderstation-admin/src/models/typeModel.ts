import TypeController from '@/services/type';
import { message } from 'antd';

export default {
  namespace: 'type',
  state: {
    typeList: [],
  },
  reducers: {
    /**
     * 获取类型
     * @param state
     * @param action
     */
    initTypeList(state: any, action: any) {
      return {
        ...state,
        typeList: action.payload,
      };
    },
    addType(state: any, action: any) {
      const newState = { ...state };
      const arr = [...newState.typeList];
      arr.push(action.payload);
      newState.adminList = arr;
      return newState;
    },
    deleteType(state: any, action: any) {
      const newState = { ...state };
      const index = newState.typeList.indexOf(action.payload);
      const arr = [...newState.typeList];
      arr.splice(index, 1);
      newState.typeList = arr;
      return newState;
    },
    updateType(state: any, action: any) {
      const newState = { ...state };
      newState.typeList = newState.typeList.map((type: any) => {
        if (type._id === action.payload.typeInfo._id) {
          return { ...type, ...action.payload.newTypeInfo };
        }
        return type;
      });
      return newState;
    },
  },
  effects: {
    *_initTypeList(action: any, { call, put }: any) {
      try {
        const { data } = yield call(TypeController.getTypeListApi);
        yield put({
          type: 'initTypeList',
          payload: data,
        });

        // 如果存在回调函数，执行回调
        if (typeof action.callback === 'function') {
          action.callback();
        }
      } catch (error) {
        message.error('获取类型列表失败');
      }
    },
    *addType(action: any, { call, put }: any) {
      try {
        yield call(TypeController.addTypeApi, action.payload);
        yield put({
          type: '_initTypeList',
        });
        message.success('新增类型成功');
      } catch (error) {
        message.error('新增类型失败');
      }
    },
    *deleteType(action: any, { call, put }: any) {
      try {
        yield call(TypeController.deleteTypeApi, action.payload._id);
        yield put({
          type: 'deleteType',
          payload: action.payload,
        });
        message.success('删除类型成功');
      } catch (error) {
        message.error('删除类型失败');
      }
    },
    *updateType(action: any, { call, put }: any) {
      try {
        yield call(
          TypeController.updateTypeApi,
          action.payload.typeInfo._id,
          action.payload.newTypeInfo,
        );
        yield put({
          type: '_initTypeList',
        });
        message.success('更新类型成功');
      } catch (error) {
        message.error('更新类型失败');
      }
    },
  },
};
