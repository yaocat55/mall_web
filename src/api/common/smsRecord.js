import request from '@/utils/request';

export function getPage(params) {
  const data = params;
  return request({
    url: '/v1/commonSmsRecord/searchByPage',
    method: 'post',
    data,
  });
}

export function add(data) {
  return request({
    url: 'v1/commonSmsRecord/insert',
    method: 'post',
    data,
  });
}

export function del(ids) {
  return request({
    url: 'v1/commonSmsRecord/deleteByIds',
    method: 'post',
    data: ids,
  });
}

export function edit(data) {
  return request({
    url: 'v1/commonSmsRecord/update',
    method: 'post',
    data,
  });
}

export default { add, edit, del, getPage };
