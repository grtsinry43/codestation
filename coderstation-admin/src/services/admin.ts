import { request } from '@umijs/max';

function getAdminList() {
  return request('/api/admin', {
    method: 'GET',
  });
}

function updateAdmin(id: number, newAdminInfo: any) {
  return request(`/api/admin/${id}`, {
    method: 'PATCH',
    data: newAdminInfo,
  });
}

function deleteAdmin(id: string) {
  return request(`/api/admin/${id}`, {
    method: 'DELETE',
  });
}

function addAdmin(data: any) {
  return request('/api/admin', {
    method: 'POST',
    data,
  });
}

export default {
  getAdminList,
  updateAdmin,
  deleteAdmin,
  addAdmin,
};
