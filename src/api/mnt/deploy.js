import request from '@/utils/request';

export function add(data) {
  return request({
    url: 'api/deploy',
    method: 'post',
    data,
  });
}

export function del(ids) {
  return request({
    url: 'api/deploy',
    method: 'delete',
    data: ids,
  });
}

export function edit(data) {
  return request({
    url: 'api/deploy',
    method: 'put',
    data,
  });
}

export function getApps() {
  return request({
    url: 'api/app',
    method: 'get',
  });
}

export function getServers() {
  return request({
    url: 'api/serverDeploy',
    method: 'get',
  });
}

export function startServer(data) {
  return request({
    url: 'api/deploy/startServer',
    method: 'post',
    data,
  });
}

export function stopServer(data) {
  return request({
    url: 'api/deploy/stopServer',
    method: 'post',
    data,
  });
}

export function serverStatus(data) {
  return request({
    url: 'api/deploy/serverStatus',
    method: 'post',
    data,
  });
}

export default { add, edit, del, stopServer, serverStatus, startServer, getServers, getApps };
