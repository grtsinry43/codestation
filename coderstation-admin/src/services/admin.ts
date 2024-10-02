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

export default {
  getAdminList,
  updateAdminStatus,
};
