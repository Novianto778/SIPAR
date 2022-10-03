import sidebarLinks from 'constants/links';
import SidebarLink from '../components/SidebarLink';

const Sidebar = () => {
  return (
    <div className="fixed bottom-0 z-10 w-full md:static md:h-full md:w-24">
      <div className="relative h-full w-full bg-blue-800 md:fixed md:w-24">
        <a
          href="/"
          className="absolute top-10 left-1/2 hidden h-14 w-14 -translate-x-1/2 transform rounded-xl hover:bg-white hover:bg-opacity-50 md:flex md:items-center md:justify-center"
        >
          <img src="/logo.png" alt="siparjo" className="rounded-full w-12 h-12" />
        </a>
        <div className="flex mt-8 h-full items-center justify-center space-x-16 py-2 md:flex-col md:space-x-0 md:space-y-4 md:py-4">
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
