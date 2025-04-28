import DarkModeIcon from '@mui/icons-material/DarkMode';
import ContrastIcon from '@mui/icons-material/Contrast';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

type HeaderProps = {
  setSidebarToggled: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ setSidebarToggled }: HeaderProps) {
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || (systemPrefersDark ? 'dark' : 'light')
  );

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  return (
    <div className="w-full flex justify-between bg-white dark:bg-dark-surface dark:text-white rounded-full shadow-2xl h-14">
      <div className="flex items-center px-4 py-2 gap-4">
        <button
          className="md:hidden p-2 rounded-full dark:hover:bg-gray-700"
          onClick={() => {
            setSidebarToggled((prev) => !prev);
          }}
        >
          <MenuIcon />
        </button>
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <div className="flex items-center px-4 py-2">
        <button className="px-4 py-2 rounded">
          <SearchIcon />
        </button>
        <button className="px-4 py-2 rounded">
          <NotificationsIcon />
          
        </button>
        <button
          className="px-4 py-2 rounded"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <ContrastIcon /> : <DarkModeIcon />}
        </button>
        <Avatar sx={{ width: 30, height: 30 }}>JD</Avatar>
        
        <div className="flex flex-col px-2">
          <span className="text-sm">John Doe</span>
          <span className="text-xs text-gray-500">Frontend Developer</span>
        </div>
      </div>
    </div>
  );
}
