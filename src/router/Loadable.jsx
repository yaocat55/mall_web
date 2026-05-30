import { Suspense, lazy } from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loading = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
    <CircularProgress size={32} sx={{ color: '#58A6FF' }} />
  </Box>
);

export function Loadable(importFunc) {
  const Component = lazy(importFunc);
  return (props) => (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
}
