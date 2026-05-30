import request from '@/utils/request';

export function getAll() {
  return request({
    url: 'v1/role/all',
    method: 'get',
  });
}

export function add(data) {
  return request({
    url: 'v1/role/insert',
    method: 'post',
    data,
  });
}

export function get(id) {
  return request({
    url: 'v1/role/findById?id=' + id,
    method: 'get',
  });
}

export function getLevel() {
  return request({
    url: 'v1/role/level',
    method: 'get',
  });
}

export function del(ids) {
  return request({
    url: 'v1/role/deleteByIds',
    method: 'post',
    data: ids,
  });
}

export function edit(data) {
  return request({
    url: 'v1/role/update',
    method: 'post',
    data,
  });
}

export function editMenu(data) {
  return request({
    url: 'v1/role/update',
    method: 'post',
    data,
  });
}

export default { add, edit, del, get, editMenu, getLevel };
