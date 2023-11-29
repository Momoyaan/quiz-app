import { lazy } from 'react';

const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Calendar = lazy(() => import('../pages/Calendar'))

const coreRoutes = [

  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },

  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },

  {
    path: '/calendar',
    title: 'Calendar',
    component: Calendar,
  },


];

const routes = [...coreRoutes];
export default routes;
