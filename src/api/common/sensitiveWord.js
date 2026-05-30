import request from '@/utils/request';

export function add(data) {
  return request({
    url: 'v1/commonSensitiveWord/insert',
    method: 'post',
    data,
  });
}

export function del(ids) {
  return request({
    url: 'v1/commonSensitiveWord/deleteByIds',
    method: 'post',
    data: ids,
  });
}

export function edit(data) {
  return request({
    url: 'v1/commonSensitiveWord/update',
    method: 'post',
    data,
  });
}

export default { add, edit, del };
