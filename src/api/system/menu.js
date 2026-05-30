import request from '@/utils/request';

export function getMenusTree(pid) {
  return request({
    url: 'v1/menu/getMenu',
    method: 'post',
    data: { pid },
  });
}

export function getMenus(params) {
  return request({
    url: 'v1/menu/searchByPage',
    method: 'post',
    params,
  });
}

export function getMenuSuperior(ids) {
  const data = Array.isArray(ids) || ids.length === 0 ? ids : Array.of(ids);
  return request({
    url: 'api/menu/superior',
    method: 'post',
    data,
  });
}

export function getChild(id) {
  return request({
    url: 'v1/menu/getChild?id=' + id,
    method: 'get',
  });
}

export function buildMenus() {
  return request({
    url: 'v1/menu/getMenuTree',
    method: 'get',
  });
}

export function add(data) {
  return request({
    url: '/v1/menu/insert',
    method: 'post',
    data,
  });
}

export function del(ids) {
  return request({
    url: '/v1/menu/deleteByIds',
    method: 'post',
    data: ids,
  });
}

export function edit(data) {
  return request({
    url: '/v1/menu/update',
    method: 'post',
    data,
  });
}

export default { add, edit, del, getMenusTree, getMenuSuperior, getMenus, buildMenus };
