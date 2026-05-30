import axios from 'axios';
import { getToken, removeToken } from './auth';
import Cookies from 'js-cookie';

const LOG_PREFIX = '[request]';

const service = axios.create({
  baseURL: import.meta.env.PROD ? import.meta.env.VITE_BASE_API : 'http://localhost:8011',
  timeout: 1200000,
  transformRequest: [(data, headers) => {
    if (data instanceof FormData || data instanceof Blob) return data;
    headers['Content-Type'] = 'application/json';
    const json = JSON.stringify(data);
    console.log(`${LOG_PREFIX} serialize`, json);
    return json;
  }],
});

service.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = 'Basic@' + token;
  }
  config.headers['Content-Type'] = 'application/json';
  config._startTime = Date.now();
  console.log(`${LOG_PREFIX} --> ${config.method?.toUpperCase()} ${config.baseURL || ''}${config.url}`, config.data || '');
  return config;
}, (error) => {
  console.error(`${LOG_PREFIX} --> ERROR`, error);
  return Promise.reject(error);
});

service.interceptors.response.use((response) => {
  const elapsed = Date.now() - (response.config._startTime || 0);
  const url = response.config.url;
  const method = response.config.method?.toUpperCase();

  if (response.data instanceof Blob) {
    console.log(`${LOG_PREFIX} <-- ${method} ${url} ${elapsed}ms [Blob]`);
    const temp = response.headers['content-disposition'].split(';')[1].split('filename=')[1];
    const fileName = decodeURIComponent(temp);
    const url = window.URL.createObjectURL(response.data);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = fileName;
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    return;
  }

  const { code, message } = response.data;
  console.log(`${LOG_PREFIX} <-- ${method} ${url} ${elapsed}ms code=${code}`, code !== 200 ? message : 'ok');

  if (code === 200) {
    return response.data;
  }
  if (code === 401) {
    console.warn(`${LOG_PREFIX} <-- 401 Unauthorized, redirecting to login`);
    removeToken();
    Cookies.set('point', 401);
    window.location.reload();
    return Promise.reject(message);
  }
  if (code === 403) {
    console.warn(`${LOG_PREFIX} <-- 403 Forbidden`);
    window.location.href = '/401';
    return Promise.reject(message);
  }
  const errorMsg = message || '接口请求失败';
  window.dispatchEvent(new CustomEvent('global-notify', {
    detail: { type: 'error', message: errorMsg },
  }));
  return Promise.reject(message);
}, (error) => {
  const elapsed = Date.now() - (error.config?._startTime || 0);
  const url = error.config?.url || 'unknown';
  const method = error.config?.method?.toUpperCase() || '?';
  const msg = error?.message || '网络请求超时';
  console.error(`${LOG_PREFIX} <-- ${method} ${url} ${elapsed}ms ERROR: ${msg}`, error);
  window.dispatchEvent(new CustomEvent('global-notify', {
    detail: { type: 'error', message: msg },
  }));
  return Promise.reject(error);
});

export default service;
