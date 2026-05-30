import { useState, useCallback, useRef, useEffect } from 'react';
import request from '@/utils/request';

const STATUS = { NORMAL: 0, PREPARED: 1, PROCESSING: 2 };

export default function useCrud(options) {
  const {
    title = '',
    url = '',
    crudMethod = {},
    defaultForm = {},
    idField = 'id',
    sortField = ['id,desc'],
    queryOnCreated = true,
  } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selections, setSelections] = useState([]);
  const [query, setQuery] = useState({});
  const [form, setForm] = useState({ ...defaultForm });
  const [addStatus, setAddStatus] = useState(STATUS.NORMAL);
  const [editStatus, setEditStatus] = useState(STATUS.NORMAL);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const defaultQuery = useRef({});
  const initialized = useRef(false);

  const getQueryParams = useCallback(() => {
    const params = { pageNo, pageSize, sortField };
    Object.entries(query).forEach(([k, v]) => {
      if (v !== null && v !== '' && v !== undefined) params[k] = v;
    });
    return params;
  }, [pageNo, pageSize, query, sortField]);

  const refresh = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await request({ url, method: 'post', data: getQueryParams() });
      setData(res.data?.data || []);
      setTotalCount(res.data?.totalCount || 0);
    } catch (e) {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [url, getQueryParams]);

  const toQuery = useCallback(() => {
    setPageNo(1);
  }, []);

  const resetForm = useCallback((data) => {
    setForm(data ? { ...data } : { ...defaultForm });
  }, [defaultForm]);

  const toAdd = useCallback(() => {
    resetForm();
    setAddStatus(STATUS.PREPARED);
  }, [resetForm]);

  const toEdit = useCallback((row) => {
    resetForm(row);
    setEditStatus(STATUS.PREPARED);
  }, [resetForm]);

  const cancelCU = useCallback(() => {
    setAddStatus(STATUS.NORMAL);
    setEditStatus(STATUS.NORMAL);
    resetForm();
  }, [resetForm]);

  const doAdd = useCallback(async () => {
    if (!crudMethod.add) return false;
    setAddStatus(STATUS.PROCESSING);
    try {
      await crudMethod.add(form);
      setAddStatus(STATUS.NORMAL);
      resetForm();
      refresh();
      return true;
    } catch {
      setAddStatus(STATUS.PREPARED);
      return false;
    }
  }, [crudMethod, form, resetForm, refresh]);

  const doEdit = useCallback(async () => {
    if (!crudMethod.edit) return false;
    setEditStatus(STATUS.PROCESSING);
    try {
      await crudMethod.edit(form);
      setEditStatus(STATUS.NORMAL);
      resetForm();
      refresh();
      return true;
    } catch {
      setEditStatus(STATUS.PREPARED);
      return false;
    }
  }, [crudMethod, form, resetForm, refresh]);

  const doDelete = useCallback(async (ids) => {
    if (!crudMethod.del) return;
    const idList = Array.isArray(ids) ? ids.map(item => item[idField] || item) : [ids[idField] || ids];
    try {
      await crudMethod.del(idList);
      if (data.length === idList.length && pageNo > 1) {
        setPageNo((p) => p - 1);
      }
      refresh();
      setSelections([]);
    } catch { /* handled by request interceptor */ }
  }, [crudMethod, data.length, pageNo, refresh, idField]);

  const dialogOpen = addStatus > STATUS.NORMAL || editStatus > STATUS.NORMAL;
  const dialogTitle = addStatus > STATUS.NORMAL ? `新增${title}` : `编辑${title}`;
  const submitting = addStatus === STATUS.PROCESSING || editStatus === STATUS.PROCESSING;

  // Save default query on first render
  if (!initialized.current || Object.keys(defaultQuery.current).length === 0) {
    defaultQuery.current = { ...query };
  }

  // Auto-refresh when page or query changes
  useEffect(() => {
    if (initialized.current) {
      refresh();
    }
  }, [pageNo, pageSize]);

  // Initialize
  useEffect(() => {
    if (queryOnCreated && !initialized.current) {
      initialized.current = true;
      refresh();
    }
    initialized.current = true;
  }, []);

  const resetQuery = useCallback((doQuery = true) => {
    setQuery({ ...defaultQuery.current });
    if (doQuery) {
      setPageNo(1);
      refresh();
    }
  }, [refresh]);

  const doExport = useCallback(async () => {
    if (!url) return;
    const arr = url.split('/');
    let downloadUrl = '';
    for (let i = 1; i < arr.length - 1; i++) {
      downloadUrl = downloadUrl + '/' + arr[i];
      if (i === arr.length - 2) {
        downloadUrl += '/export';
      }
    }
    try {
      await request({ url: downloadUrl, method: 'post', data: getQueryParams(), responseType: 'blob' });
    } catch { /* handled by interceptor */ }
  }, [url, getQueryParams]);

  return {
    data, loading, selections, form, query,
    pageNo, pageSize, totalCount,
    dialogOpen, dialogTitle, submitting,
    addStatus, editStatus,
    setQuery, setForm, setSelections, setPageNo, setPageSize,
    toQuery, refresh, toAdd, toEdit, doDelete,
    cancelCU, doAdd, doEdit,
    resetQuery, doExport, resetForm,
    STATUS,
  };
}

export { STATUS };
