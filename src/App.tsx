import { createBrowserRouter } from 'react-router-dom';
import { AdminPage } from './pages/AdminPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NetworkPage } from './pages/NetworkPage';
import './index.css';
import { PrivateRoute } from './auth/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <AdminPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/admin/social',
    element: <NetworkPage />,
  },
]);
export { router };
