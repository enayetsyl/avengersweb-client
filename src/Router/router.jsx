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
import DeveloperEdit from '../development/DeveloperEdit';
import MarketingDashboard from '../marketing/pages/MarketingDashboard';
import CallerDashboard from '../marketing/pages/CallerDashboard';
import DeveloperDashboard from '../development/DeveloperDashboard';
import About from '../pages/About';

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
      {
        path: '/about',
        element: <About />,
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
        path: '/marketing/lead-collector-dashboard',
        element: (
          <PrivateRoute allowedRoles={['marketingAdmin']}>
          <MarketingDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/marketing/caller-dashboard',
        element: (
          <PrivateRoute allowedRoles={['marketingAdmin']}>
          <CallerDashboard />
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
        path: '/development/dashboard',
        element: (
          <PrivateRoute allowedRoles={['developmentAdmin']}>
          <DeveloperDashboard />
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
      {
        path: '/development/developer/edit/:id',
        element: (
          <PrivateRoute allowedRoles={['Developer']}>
          <DeveloperEdit />
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
