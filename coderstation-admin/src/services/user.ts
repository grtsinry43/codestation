import { request } from '@umijs/max';

function getUserList({
  current,
  pageSize,
  loginId,
}: {
  current: number;
  pageSize: number;
  loginId?: string;
}) {
  return request('/api/user', {
    method: 'GET',
    params: {
      currentPage: current,
      eachPage: pageSize,
      loginId,
    },
  });
}

function updateUser(id: string, newUserInfo: any) {
  return request(`/api/user/${id}`, {
    method: 'PATCH',
    data: newUserInfo,
  });
}

export default {
  getUserList,
  updateUser,
};
