import request from '@/utils/request';

export function getPage(params) {
  return request({ url: '/v1/couponUserReceive/searchByPage', method: 'post', data: params });
}
export function add(data) {
  return request({ url: 'v1/couponUserReceive/insert', method: 'post', data });
}
export function del(ids) {
  return request({ url: 'v1/couponUserReceive/deleteByIds', method: 'post', data: ids });
}
export function edit(data) {
  return request({ url: 'v1/couponUserReceive/update', method: 'post', data });
}
export default { getPage, add, edit, del };
