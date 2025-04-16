import { Outlet } from 'react-router-dom';
import CustomSidebar from '../ui/CustomSidebar';
import Header from '../ui/Header';
import { useState } from 'react';

export default function AppLayout() {
  const [sidebarToggled, setSidebarToggled] = useState(true);
  return (
    <div className="w-full h-screen flex gap-4 bg-light dark:bg-dark text-black dark:text-white">
      <CustomSidebar toggled={sidebarToggled} setToggled={setSidebarToggled} />
      <main className="flex-1 h-full flex flex-col px-2 pt-3 overflow-y-auto">
        <Header setSidebarToggled={setSidebarToggled} />
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
