import { Routes, Route } from 'react-router-dom';
import DashboardLayout from 'layout/DashboardLayout';
import { ROUTES } from 'constants/routes';
import Login from 'pages/Login';
import useAuthStateChange from 'hooks/useAuthStateChange';
import ProtectedRoutes from 'layout/ProtectedRoutes';
import Dashboard from 'pages/Dashboard';

function App() {
  const { loading } = useAuthStateChange();
  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path={ROUTES.HOME} element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path={ROUTES.LIST_MOTOR} element={<div>List Motor</div>} />
          <Route path={ROUTES.TRANSACTION} element={<div>Transaksi</div>} />
          <Route path={ROUTES.SERVICE} element={<div>Data Service</div>} />
          <Route path={ROUTES.REPORT} element={<div>Laporan Bulanan</div>} />
        </Route>
      </Route>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<div>Register</div>} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
