import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import MarketingLayout from '../MainLayout/MarketingLayout';

import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';

// marketing routes
import MarketingAdmin from '../marketing/pages/MarketingAdmin';
import LeadCollector from '../marketing/pages/LeadCollector';
import Caller from '../marketing/pages/Caller';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  // marketing routes
  {
    path: '/marketing',
    element: <MarketingLayout />,
    children: [
      {
        path: '/marketing',
        element: (
          // <PrivateRoute>
          <MarketingAdmin />
          // </PrivateRoute>
        ),
      },
      {
        path: '/marketing/lead-collector',
        element: (
          // <PrivateRoute>
            <LeadCollector />
          // </PrivateRoute>
        ),
      },
      {
        path: '/marketing/caller',
        element: (
          // <PrivateRoute>
            <Caller />
          // </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
