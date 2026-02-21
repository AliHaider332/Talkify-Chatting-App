import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import ProtectedRoutes from './ProtectedRoutes';
import App from '../App';
import { useSelector } from 'react-redux';
import ProfilePage from '../Pages/ProfilePage';
import NotFoundPage from '../Pages/NotFoundPage';
import UserProfile from '../Pages/UserProfile';
export const RoutesSetup = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/home" /> },

      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },

      {
        element: <ProtectedRoutes />,
        children: [
          { path: '/home', element: <Home /> },
          { path: '/profile', element: <ProfilePage /> },
          { path: '/:id', element: <UserProfile /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
