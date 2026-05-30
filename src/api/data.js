import request from '@/utils/request';

export function initData(url, params) {
  return request({ url, method: 'post', data: params });
}

export function download(url, params) {
  return request({ url, method: 'post', data: params, responseType: 'blob' });
}
