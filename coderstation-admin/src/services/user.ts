import { request } from '@umijs/max';

function getUserList(params: any) {
  return request('/api/user', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

function updateUser(id: string, newUserInfo: any) {
  return request(`/api/user/${id}`, {
    method: 'PATCH',
    data: newUserInfo,
  });
}

function deleteUser(id: string) {
  return request(`/api/user/${id}`, {
    method: 'DELETE',
  });
}

function addUser(data: any) {
  data.type = 'background';
  return request('/api/user', {
    method: 'POST',
    data: data,
  });
}

function getUserById(id: string) {
  return request(`/api/user/${id}`, {
    method: 'GET',
  });
}

export default {
  getUserList,
  updateUser,
  deleteUser,
  addUser,
  getUserById,
};
