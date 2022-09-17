import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from 'store/userStore';

const ProtectedRoutes = () => {
  const { user } = useUserStore((state) => state);
  const location = useLocation();

  return user ? <Outlet /> : <Navigate to="/login" state={location.pathname} />;
};

export default ProtectedRoutes;
