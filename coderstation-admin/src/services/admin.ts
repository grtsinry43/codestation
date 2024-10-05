import { request } from '@umijs/max';

export function getAdminList() {
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

/**
 * 根据 loginId 查找管理员
 */
function adminIsExist(loginId: string) {
  return request(`/api/admin/adminIsExist/${loginId}`, {
    method: 'GET',
  });
}

/**
 * 获取验证码
 */

function getCaptcha() {
  return request('/res/captcha', {
    method: 'GET',
  });
}

/**
 * 管理员登录
 */
function login(loginInfo: any) {
  return request('/api/admin/login', {
    method: 'POST',
    data: loginInfo,
  });
}

/**
 * 恢复登录状态
 */

function getInfo() {
  return request('/api/admin/whoami', {
    method: 'GET',
  });
}

/**
 * 根据 id 获取管理员
 */
function getAdminById(adminId: string) {
  return request(`/api/admin/${adminId}`, {
    method: 'GET',
  });
}

export default {
  getAdminList,
  updateAdmin,
  deleteAdmin,
  addAdmin,
  adminIsExist,
  getCaptcha,
  login,
  getInfo,
  getAdminById,
};
