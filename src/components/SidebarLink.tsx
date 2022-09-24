import { IconType } from 'react-icons';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  name: string;
  Icon: IconType;
  path: string;
}

const SidebarLink: React.FC<Props> = ({ name, Icon, path }) => {
  const { pathname } = useLocation();

  return (
    <Link to={path} className="group">
      <div
        className={`sidebar-btn ${
          pathname.includes(path) &&
          'bg-white text-red-500 shadow-xl duration-300 md:h-14 md:w-14 md:-translate-y-0 md:translate-x-8'
        }`}
      >
        <Icon className="h-6 w-6" />
        <div className="sidebar-tooltip">{name}</div>
      </div>
    </Link>
  );
};

export default SidebarLink;
