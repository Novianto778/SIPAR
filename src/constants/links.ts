import { HiHome } from 'react-icons/hi';
import { FaMotorcycle } from 'react-icons/fa';
import { AiFillTool } from 'react-icons/ai';
import { TbReportAnalytics } from 'react-icons/tb';
import { BiTransfer } from 'react-icons/bi';

const sidebarLinks = [
  {
    name: 'Dashboard',
    icon: HiHome,
    path: '/',
  },
  {
    name: 'Transaksi',
    icon: BiTransfer,
    path: '/transaksi',
  },
  {
    name: 'List Motor',
    icon: FaMotorcycle,
    path: '/list-motor',
  },
  {
    name: 'Service',
    icon: AiFillTool,
    path: '/service',
  },
  {
    name: 'Laporan',
    icon: TbReportAnalytics,
    path: '/laporan',
  },
];

export default sidebarLinks;
