import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import '../App.css';
import { useEffect } from 'react';
const ProtectedRoutes = () => {
  const navigation = useNavigate();
  const { isAuthenticated, screenLoading } = useSelector(
    (state) => state.userReducer
  );
  useEffect(() => {
    if (!screenLoading && !isAuthenticated) {
      navigation('/login');
    }
  }, [screenLoading,isAuthenticated]);
  if (screenLoading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
