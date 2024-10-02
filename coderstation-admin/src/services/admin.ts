import { request } from '@umijs/max';

function getAdminList() {
  return request('/api/admin', {
    method: 'GET',
  });
}

function updateAdminStatus(id: number, status: string) {
  return request(`/api/admin/${id}`, {
    method: 'PATCH',
    data: {
      enabled: status,
    },
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
  updateAdminStatus,
  deleteAdmin,
  addAdmin,
};
