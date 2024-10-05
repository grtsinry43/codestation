import { request } from '@umijs/max';

export function getTypeListApi() {
  return request('/api/type', {
    method: 'GET',
  });
}

function addTypeApi(data: any) {
  return request('/api/type', {
    method: 'POST',
    data,
  });
}

function deleteTypeApi(id: string) {
  return request(`/api/type/${id}`, {
    method: 'DELETE',
  });
}

function updateTypeApi(id: string, data: any) {
  return request(`/api/type/${id}`, {
    method: 'PATCH',
    data,
  });
}

export default {
  getTypeListApi,
  addTypeApi,
  deleteTypeApi,
  updateTypeApi,
};
