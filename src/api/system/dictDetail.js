import request from '@/utils/request';

export function get(dictName) {
  const data = { dictName };
  return request({
    url: 'v1/dictDetail/searchDictDetail',
    method: 'post',
    data,
  });
}

export function getDictMap(dictName) {
  const params = {
    dictName,
    page: 0,
    size: 9999,
  };
  return request({
    url: 'api/dictDetail/map',
    method: 'get',
    params,
  });
}

export function add(data) {
  return request({
    url: 'v1/dictDetail/insert',
    method: 'post',
    data,
  });
}

export function del(id) {
  return request({
    url: 'v1/dictDetail/deleteByIds',
    method: 'post',
    data: id,
  });
}

export function edit(data) {
  return request({
    url: 'v1/dictDetail/update',
    method: 'post',
    data,
  });
}

export default { add, edit, del };
