import request from '@/utils/request';

export function getDicts(type) {
  const data = {
    pageNo: 1,
    pageSize: 9999,
    type,
  };
  return request({
    url: 'v1/dict/searchByPage',
    method: 'post',
    data,
  });
}

export function add(data) {
  return request({
    url: 'v1/dict/insert',
    method: 'post',
    data,
  });
}

export function del(ids) {
  return request({
    url: 'v1/dict/deleteByIds',
    method: 'post',
    data: ids,
  });
}

export function edit(data) {
  return request({
    url: 'v1/dict/update',
    method: 'post',
    data,
  });
}

export default { add, edit, del };
