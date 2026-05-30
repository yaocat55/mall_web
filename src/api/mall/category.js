import request from '@/utils/request';

export function add(data) {
  return request({
    url: 'v1/category/insert',
    method: 'post',
    data,
  });
}

export function del(ids) {
  return request({
    url: 'v1/category/deleteByIds',
    method: 'post',
    data: ids,
  });
}

export function edit(data) {
  return request({
    url: 'v1/category/update',
    method: 'post',
    data,
  });
}

export function getCategoryTree(params) {
  const data = params;
  return request({
    url: '/v1/category/searchByTree',
    method: 'post',
    data,
  });
}

export default { add, edit, del, getCategoryTree };
