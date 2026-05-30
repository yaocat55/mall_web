import request from '@/utils/request';

export function login(username, password, code, uuid) {
  return request({
    url: '/v1/web/user/login',
    method: 'post',
    data: { username, password, code, uuid },
  });
}

export function getInfo() {
  return request({ url: '/v1/web/user/info', method: 'get' });
}

export function getCodeImg() {
  return request({ url: '/v1/web/user/code', method: 'get' });
}

export function logout() {
  return request({ url: '/v1/web/user/logout', method: 'post' });
}
