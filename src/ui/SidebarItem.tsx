import { Link, useLocation } from 'react-router-dom';
import { SidebarItemData } from './types';

interface SidebarItemProps extends SidebarItemData {
  collapsed: boolean;
  onClick: () => void;
}

export default function SidebarItem({
  icon: Icon,
  label,
  path,
  collapsed,
  onClick,
}: SidebarItemProps) {
  const location = useLocation();
  const isActive =
    path === '/dashboard'
      ? location.pathname === '/' || location.pathname.startsWith('/dashboard')
      : location.pathname.startsWith(path);

  return (
    <Link
      to={path}
      onClick={onClick}
      className={`flex items-center gap-5 px-3 py-2 rounded-md transition-colors ${
        isActive
          ? 'bg-dark-sidebar-active text-white font-extrabold'
          : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
      }`}
    >
      <Icon fontSize="medium" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
