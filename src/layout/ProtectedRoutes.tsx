import { ROUTES } from 'constants/routes';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from 'store/userStore';

const ProtectedRoutes = () => {
  const { user } = useUserStore((state) => state);
  const location = useLocation();

  if (location.pathname === '/' && user) {
    return <Navigate to={ROUTES.HOME} />;
  }

  if (location.pathname === ROUTES.LOGIN && user) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return user ? <Outlet /> : <Navigate to="/login" state={location.pathname} />;
};

export default ProtectedRoutes;
