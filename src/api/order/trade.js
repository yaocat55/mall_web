import request from '@/utils/request';

export function add(data) {
  return request({
    url: 'v1/trade/insert',
    method: 'post',
    data,
  });
}

export function del(ids) {
  return request({
    url: 'v1/trade/deleteByIds',
    method: 'post',
    data: ids,
  });
}

export function edit(data) {
  return request({
    url: 'v1/trade/update',
    method: 'post',
    data,
  });
}

export function shipped(ids) {
  return request({
    url: 'v1/trade/shippedByIds',
    method: 'post',
    data: ids,
  });
}

export default { add, edit, del, shipped };
