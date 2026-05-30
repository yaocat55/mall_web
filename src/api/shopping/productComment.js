import request from '@/utils/request';

export function getPage(params) {
  return request({ url: '/v1/productComment/searchByPage', method: 'post', data: params });
}
export function add(data) {
  return request({ url: 'v1/productComment/insert', method: 'post', data });
}
export function del(ids) {
  return request({ url: 'v1/productComment/deleteByIds', method: 'post', data: ids });
}
export function edit(data) {
  return request({ url: 'v1/productComment/update', method: 'post', data });
}
export default { getPage, add, edit, del };
