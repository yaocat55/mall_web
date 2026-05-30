import request from '@/utils/request';
import { encrypt } from '@/utils/rsaEncrypt';

export function add(data) {
  return request({
    url: 'v1/user/insert',
    method: 'post',
    data,
  });
}

export function del(ids) {
  return request({
    url: 'v1/user/deleteByIds',
    method: 'post',
    data: ids,
  });
}

export function edit(data) {
  return request({
    url: 'v1/user/update',
    method: 'post',
    data,
  });
}

export function editUser(data) {
  return request({
    url: 'api/users/center',
    method: 'put',
    data,
  });
}

export function updatePass(user) {
  const data = {
    oldPass: encrypt(user.oldPass),
    newPass: encrypt(user.newPass),
  };
  return request({
    url: 'v1/user/updatePass/',
    method: 'post',
    data,
  });
}

export function resetPwd(ids) {
  return request({
    url: 'v1/user/resetPwd',
    method: 'post',
    data: ids,
  });
}

export function updateEmail(form) {
  const data = {
    password: encrypt(form.pass),
    email: form.email,
  };
  return request({
    url: 'v1/user/updateEmail/' + form.code,
    method: 'post',
    data,
  });
}

export default { add, edit, del, resetPwd };
