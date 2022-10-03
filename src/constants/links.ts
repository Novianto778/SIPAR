import { HiHome } from 'react-icons/hi';
import { FaMotorcycle } from 'react-icons/fa';
import { AiFillTool, AiOutlineUserAdd } from 'react-icons/ai';
import { TbReportAnalytics } from 'react-icons/tb';
import { BiTransfer } from 'react-icons/bi';
import { ROUTES } from './routes';

const sidebarLinks = [
  {
    name: 'Dashboard',
    icon: HiHome,
    path: ROUTES.HOME,
  },
  {
    name: 'Transaksi',
    icon: BiTransfer,
    path: ROUTES.TRANSACTION,
  },
  {
    name: 'List Motor',
    icon: FaMotorcycle,
    path: ROUTES.LIST_MOTOR,
  },
  {
    name: 'Service',
    icon: AiFillTool,
    path: ROUTES.SERVICE,
  },
  {
    name: 'Laporan',
    icon: TbReportAnalytics,
    path: ROUTES.REPORT,
  },
  {
    name: 'Kelola User',
    icon: AiOutlineUserAdd,
    path: ROUTES.MANAGE_USER,
  },
];

export default sidebarLinks;
