import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';
import GlobalNotify from './components/GlobalNotify';

export default function App() {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <AppRouter />
      <GlobalNotify />
    </BrowserRouter>
  );
}
