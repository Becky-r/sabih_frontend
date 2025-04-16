import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { sidebarSections } from './SidebarConfig';
import SidebarSection from './SidebarSection';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import SidebarItem from './SidebarItem';
import SettingsIcon from '@mui/icons-material/Settings';

type CustomSidebarProps = {
  toggled: boolean;
  setToggled: (val: boolean) => void;
};

export default function CustomSidebar({
  toggled,
  setToggled,
}: CustomSidebarProps) {
  const isMdUp = useMediaQuery('(min-width:768px)');
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const settingsItem = {
    icon: SettingsIcon,
    label: 'Settings',
    path: '/settings',
  };

  useEffect(() => {
    if (isMdUp) {
      setToggled(true);
    } else {
      setToggled(false);
      setCollapsed(false);
    }
  }, [isMdUp, setToggled]);

  if (!toggled && !isMdUp) return null;

  return (
    <aside
      className={`h-screen transition-all duration-300 bg-light dark:bg-dark-surface text-black dark:text-white shadow-2xl dark:shadow-none flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      } flex-shrink-0`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <span className={`${collapsed ? 'hidden' : 'block'} font-extrabold `}>
          WorkTrack
        </span>
        <button
          onClick={() => {
            if (isMdUp) {
              setCollapsed(!collapsed);
            } else {
              setToggled(false);
            }
          }}
        >
          <ViewSidebarIcon />
        </button>
      </div>

      <nav className="flex flex-col gap-4 px-2 py-4 overflow-y-auto flex-1">
        {sidebarSections.map((section, idx) => (
          <SidebarSection
            key={idx}
            section={section}
            collapsed={collapsed}
            setToggled={setToggled}
            isMdUp={isMdUp}
          />
        ))}
      </nav>
      <div className=" pb-5">
        <SidebarItem
          key={settingsItem.label}
          {...settingsItem}
          collapsed={collapsed}
          onClick={() => !isMdUp && setToggled(false)}
        />
      </div>
    </aside>
  );
}
