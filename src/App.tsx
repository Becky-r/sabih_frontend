import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import Attendance from './pages/Attendance';
import Backend from './pages/Backend';
import Frontend from './pages/Frontend';
import FigmaDesigns from './pages/FigmaDesigns';
import General from './pages/General';
import Information from './pages/Information';
import Projects from './pages/Projects';
import Schedules from './pages/Schedules';
import Settings from './pages/Settings';
import TaskAllocation from './pages/TaskAllocation';
import Client from './pages/Client';
import Registration from './pages/Registration';
import Report from './pages/Report';
import Chat from './pages/Chat';
import IDFrom from './pages/IDFrom';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', index: true, element: <Dashboard /> },
      { path: 'dashboard', index: true, element: <Dashboard /> },
      { path: 'attendance', element: <Attendance /> },
      { path: 'backend', element: <Backend /> },
      { path: 'frontend', element: <Frontend /> },
      { path: 'figma-designs', element: <FigmaDesigns /> },
      { path: 'general', element: <General /> },
      { path: 'information', element: <Information /> },
      { path: 'projects', element: <Projects /> },
      { path: 'schedules', element: <Schedules /> },
      { path: 'settings', element: <Settings /> },
      { path: 'TaskAllocation', element: <TaskAllocation /> },
      { path:'Client', element: <Client /> },
      { path:'Registration', element: <Registration /> },
      { path:'Report', element: <Report /> },
      { path:'Chat', element: <Chat /> },
      { path:'IDFrom', element: <IDFrom /> },
      
    ],
  },
  { path: '*', element: <NotFound /> },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
