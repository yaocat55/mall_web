import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Redirect() {
  const { path } = useParams();
  const navigate = useNavigate();
  useEffect(() => { navigate('/' + (path || ''), { replace: true }); }, [path, navigate]);
  return null;
}
