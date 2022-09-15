import sidebarLinks from '../constants/links';
import SidebarLink from './SidebarLink';

const Sidebar = () => {
  return (
    <div className="fixed bottom-0 z-10 w-full md:static md:h-full md:w-24">
      <div className="relative h-full w-full bg-blue-800 md:fixed md:w-24">
        <a
          href="/"
          className="absolute top-10 left-1/2 hidden h-14 w-14 -translate-x-1/2 transform rounded-xl hover:bg-white hover:bg-opacity-50 md:flex md:items-center md:justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-8 w-8 text-white"
          >
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </svg>
        </a>
        <div className="flex h-full items-center justify-center space-x-16 py-2 md:flex-col md:space-x-0 md:space-y-4 md:py-4">
          {sidebarLinks.map((item) => {
            return (
              <SidebarLink
                key={item.name}
                name={item.name}
                Icon={item.icon}
                path={item.path}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
