import request from '@/utils/request';

export function add(data) {
  return request({
    url: 'v1/commonNotify/insert',
    method: 'post',
    data,
  });
}

export function del(ids) {
  return request({
    url: 'v1/commonNotify/deleteByIds',
    method: 'post',
    data: ids,
  });
}

export function edit(data) {
  return request({
    url: 'v1/commonNotify/update',
    method: 'post',
    data,
  });
}

export default { add, edit, del };
