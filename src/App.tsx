import { Routes, Route } from 'react-router-dom';
import DashboardLayout from 'layout/DashboardLayout';
import { ROUTES } from 'constants/routes';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<DashboardLayout />}>
        <Route index element={<div>Hallo</div>} />
        <Route path={ROUTES.LIST_MOTOR} element={<div>List Motor</div>} />
        <Route path={ROUTES.TRANSACTION} element={<div>Transaksi</div>} />
        <Route path={ROUTES.SERVICE} element={<div>Data Service</div>} />
        <Route path={ROUTES.REPORT} element={<div>Laporan Bulanan</div>} />
      </Route>
      <Route path={ROUTES.LOGIN} element={<div>Login</div>} />
      <Route path={ROUTES.REGISTER} element={<div>Register</div>} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
