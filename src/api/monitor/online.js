import request from '@/utils/request';

export function getOnlineUsers(params) {
  return request({
    url: 'auth/online',
    method: 'get',
    params,
  });
}

export function del(keys) {
  return request({
    url: 'auth/online',
    method: 'delete',
    data: keys,
  });
}
