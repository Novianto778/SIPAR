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
import EditMotor from 'pages/Motor/EditMotor';
import Transaksi from 'pages/Transaksi';
import TransaksiDetail from 'pages/Transaksi/TransaksiDetail';
import TambahTransaksi from 'pages/Transaksi/TambahTransaksi';
import EditTransaksi from 'pages/Transaksi/EditTransaksi';
import Service from 'pages/Service';
import TambahService from 'pages/Service/TambahService';

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
            <Route path="edit/:id" element={<EditMotor />} />
          </Route>
          <Route path={ROUTES.TRANSACTION}>
            <Route index element={<Transaksi />} />
            <Route path="add" element={<TambahTransaksi />} />
            <Route path="detail/:id" element={<TransaksiDetail />} />
            <Route path="edit/:id" element={<EditTransaksi />} />
          </Route>
          <Route path={ROUTES.SERVICE}>
            <Route index element={<Service />} />
            <Route path="add" element={<TambahService />} />
          </Route>
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
