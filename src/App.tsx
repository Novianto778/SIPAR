import { Routes, Route } from 'react-router-dom';
import DashboardLayout from 'layout/DashboardLayout';
import { ROUTES } from 'constants/routes';
import Login from 'pages/Login';
import useAuthStateChange from 'hooks/useAuthStateChange';
import ProtectedRoutes from 'layout/ProtectedRoutes';
import Dashboard from 'pages/Dashboard';
import ListMotor from 'pages/Motor';
import 'react-loading-skeleton/dist/skeleton.css';
import AddMotor from 'pages/Motor/AddMotor';

function App() {
  const { loading } = useAuthStateChange();
  if (loading) return <div>Loading...</div>;
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route path={ROUTES.HOME} element={<Dashboard />} />
          <Route path={ROUTES.LIST_MOTOR}>
            <Route index element={<ListMotor />} />
            <Route path="add" element={<AddMotor />} />
          </Route>
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
