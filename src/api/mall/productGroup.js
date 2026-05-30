import request from '@/utils/request';

export function getPage(params) {
  return request({ url: '/v1/productGroup/searchByPage', method: 'post', data: params });
}
export function add(data) {
  return request({ url: 'v1/productGroup/insert', method: 'post', data });
}
export function del(ids) {
  return request({ url: 'v1/productGroup/deleteByIds', method: 'post', data: ids });
}
export function edit(data) {
  return request({ url: 'v1/productGroup/update', method: 'post', data });
}
export default { getPage, add, edit, del };
