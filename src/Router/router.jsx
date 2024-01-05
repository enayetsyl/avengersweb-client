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
import AddLead from '../marketing/pages/AddLead';
import EditLead from '../marketing/pages/EditLead';
import AddCaller from '../marketing/pages/AddCaller';
import EditCaller from '../marketing/pages/EditCaller';
import DevelopmentLayout from '../MainLayout/DevLayout';
import DevelopmentAdmin from '../development/DevelopmentAdmin';
import SingleDeveloper from '../development/SingleDeveloper';

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
          <PrivateRoute allowedRoles={['marketingAdmin']}>
          <MarketingAdmin />
          </PrivateRoute>
        ),
      },
      {
        path: '/marketing/lead-collector',
        element: (
           <PrivateRoute allowedRoles={['LeadCollector']}>
            <LeadCollector />
           </PrivateRoute>
        ),
      },
      {
        path: '/marketing/lead-collector/add',
        element: (
          <PrivateRoute allowedRoles={['LeadCollector']}>
          <AddLead />
          </PrivateRoute>
        ),
      },
      {
        path: '/marketing/lead-collector/edit/:id',
        element: (
          <PrivateRoute allowedRoles={['LeadCollector']}>
          <EditLead />
          </PrivateRoute>
        ),
      },
      {
        path: '/marketing/caller',
        element: (
          <PrivateRoute allowedRoles={['Caller']}>
            <Caller />
          </PrivateRoute>
        ),
      },
      {
        path: '/marketing/caller/add',
        element: (
          <PrivateRoute allowedRoles={['Caller']}>
          <AddCaller />
          </PrivateRoute>
        ),
      },
      {
        path: '/marketing/caller/edit/:id',
        element: (
          <PrivateRoute allowedRoles={['Caller']}>
          <EditCaller />
          </PrivateRoute>
        ),
      },
    ],
  },
  // development routes
  {
    path: '/development',
    element: <DevelopmentLayout />,
    children: [
      {
        path: '/development',
        element: (
          <PrivateRoute allowedRoles={['developmentAdmin']}>
          <DevelopmentAdmin />
          </PrivateRoute>
        ),
      },
      {
        path: '/development/developer',
        element: (
           <PrivateRoute allowedRoles={['Developer']}>
            <SingleDeveloper />
           </PrivateRoute>
        ),
      },
      // {
      //   path: '/marketing/lead-collector/add',
      //   element: (
      //     <PrivateRoute allowedRoles={['LeadCollector']}>
      //     <AddLead />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: '/marketing/lead-collector/edit/:id',
      //   element: (
      //     <PrivateRoute allowedRoles={['LeadCollector']}>
      //     <EditLead />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: '/marketing/caller',
      //   element: (
      //     <PrivateRoute allowedRoles={['Caller']}>
      //       <Caller />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: '/marketing/caller/add',
      //   element: (
      //     <PrivateRoute allowedRoles={['Caller']}>
      //     <AddCaller />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: '/marketing/caller/edit/:id',
      //   element: (
      //     <PrivateRoute allowedRoles={['Caller']}>
      //     <EditCaller />
      //     </PrivateRoute>
      //   ),
      // },
    ],
  },
]);

export default router;
