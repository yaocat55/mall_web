import request from '@/utils/request';

export function getDepts(params) {
  const data = params;
  return request({
    url: '/v1/dept/searchByPage',
    method: 'post',
    data,
  });
}

export function getDeptTree(params) {
  const data = params;
  return request({
    url: '/v1/dept/searchByTree',
    method: 'post',
    data,
  });
}

export function getDeptSuperior(ids, exclude) {
  const data = { id: ids };
  return request({
    url: 'v1/dept/searchByTree',
    method: 'post',
    data,
  });
}

export function add(data) {
  return request({
    url: 'v1/dept/insert',
    method: 'post',
    data,
  });
}

export function del(ids) {
  return request({
    url: 'v1/dept/deleteByIds',
    method: 'post',
    data: ids,
  });
}

export function edit(data) {
  return request({
    url: 'v1/dept/update',
    method: 'post',
    data,
  });
}

export default { add, edit, del, getDepts, getDeptSuperior, getDeptTree };
