import request from '@/utils/request';

export function getAllJob() {
  const data = {
    pageNo: 1,
    pageSize: 9999,
    enabled: true,
  };
  return request({
    url: 'v1/job/searchByPage',
    method: 'post',
    data,
  });
}

export function add(data) {
  return request({
    url: 'v1/job/insert',
    method: 'post',
    data,
  });
}

export function del(ids) {
  return request({
    url: 'v1/job/deleteByIds',
    method: 'post',
    data: ids,
  });
}

export function edit(data) {
  return request({
    url: 'v1/job/update',
    method: 'post',
    data,
  });
}

export default { add, edit, del };
