import request from '@/utils/request';

export function add(data) {
  return request({
    url: 'v1/commonJob/insert',
    method: 'post',
    data,
  });
}

export function del(ids) {
  return request({
    url: 'v1/commonJob/deleteByIds',
    method: 'post',
    data: ids,
  });
}

export function edit(data) {
  return request({
    url: 'v1/commonJob/update',
    method: 'post',
    data,
  });
}

export function runNow(id) {
  const data = { id };
  return request({
    url: 'v1/commonJob/runNow',
    method: 'post',
    data,
  });
}

export function resume(id) {
  const data = { id };
  return request({
    url: 'v1/commonJob/resume',
    method: 'post',
    data,
  });
}

export function pause(id) {
  const data = { id };
  return request({
    url: 'v1/commonJob/pause',
    method: 'post',
    data,
  });
}

export default { add, edit, del, runNow, resume, pause };
