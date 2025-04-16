import Card from './Card';
import { People, Work, TrendingUp, Percent } from '@mui/icons-material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

type TabKey = 'General' | 'Frontend' | 'Backend';

export default function DashboardLayout() {
  const dashboardData = {
    employeesPresent: {
      title: 'Employees Present',
      value: '18/20',
      diff: '2',
      diffContext: 'from yesterday',
      icon: People,
    },
    completedProjects: {
      title: 'Completed Projects',
      value: '12',
      diff: '2',
      diffContext: 'this month',
      icon: Work,
    },

    ongoingProjects: {
      title: 'Ongoing Projects',
      value: '8',
      diff: '-1',
      diffContext: 'less this month',
      icon: TrendingUp,
    },
    generalProgress: {
      title: 'General Progress',
      value: '80%',
      diff: '-10%',
      diffContext: 'drop this month',
      icon: Percent,
    },
    totalProjects: [
      { name: 'New', value: 62, color: '#FBBF24' },
      { name: 'Remaining', value: 20, color: '#60A5FA' },
      { name: 'Pending', value: 12, color: '#A78BFA' },
    ],
  };

  const employeeAttendance = [
    {
      name: 'Jon Doe',
      position: 'Frontend Developer',
      status: 'Present',
    },
    {
      name: 'Blink Lemma',
      position: 'Full Stack Developer',
      status: 'Present',
    },
    {
      name: 'Benedict Viner',
      position: 'Frontend Developer',
      status: 'Present',
    },
    {
      name: 'Kebede Germer',
      position: 'UI Designer',
      status: 'Permitted',
    },
    {
      name: 'Ayelneh Girma',
      position: 'Frontend Developer',
      status: 'Absent',
    },
  ];

  return (
    <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Card
        title={dashboardData.employeesPresent.title}
        icon={dashboardData.employeesPresent.icon}
      >
        <ValueUI value={dashboardData.employeesPresent.value} />
        <DiffUI
          diff={dashboardData.employeesPresent.diff}
          isPositive={!dashboardData.employeesPresent.diff.startsWith('-')}
        >
          {dashboardData.employeesPresent.diffContext}
        </DiffUI>
      </Card>

      <Card
        title={dashboardData.completedProjects.title}
        icon={dashboardData.completedProjects.icon}
      >
        <ValueUI value={dashboardData.completedProjects.value} />
        <DiffUI
          diff={dashboardData.completedProjects.diff}
          isPositive={!dashboardData.completedProjects.diff.startsWith('-')}
        >
          {dashboardData.completedProjects.diffContext}
        </DiffUI>
      </Card>
      <Card title="Total Projects" icon={Percent} classname="row-span-2">
        <div className="flex justify-between items-center gap-5 h-full">
          <div className="flex flex-col gap-2">
            {dashboardData.totalProjects.map((entry, index) => (
              <div key={index} className="flex gap-2 items-center">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></span>
                <span className="text-gray-500 text-sm">{entry.name}</span>
              </div>
            ))}
          </div>

          <div className="w-72 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboardData.totalProjects}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={70}
                  innerRadius={30}
                  stroke="none"
                >
                  {dashboardData.totalProjects.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <Card
        title={dashboardData.ongoingProjects.title}
        icon={dashboardData.ongoingProjects.icon}
      >
        <ValueUI value={dashboardData.ongoingProjects.value} />
        <DiffUI
          diff={dashboardData.ongoingProjects.diff}
          isPositive={!dashboardData.ongoingProjects.diff.startsWith('-')}
        >
          {dashboardData.ongoingProjects.diffContext}
        </DiffUI>
      </Card>

      <Card
        title={dashboardData.generalProgress.title}
        icon={dashboardData.generalProgress.icon}
      >
        <ValueUI value={dashboardData.generalProgress.value} />
        <DiffUI
          diff={dashboardData.generalProgress.diff}
          isPositive={!dashboardData.generalProgress.diff.startsWith('-')}
        >
          {dashboardData.generalProgress.diffContext}
        </DiffUI>
      </Card>
      <div className="col-span-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        <Card classname="" title="Employee Attendance" icon={People}>
          <div className="flex flex-col gap-4">
            {employeeAttendance.map((employee, index) => (
              <EmployeeCard key={index} {...employee} />
            ))}
          </div>
        </Card>
        <Card classname="" title="Project Progress" icon={Work}>
          <ProjectProgressCard />
        </Card>
        <Card classname="" title="Project Schedule" icon={DateRangeIcon}>
          <ProjectScheduleCard />
        </Card>
      </div>
    </div>
  );
}

function ValueUI({ value }: { value: string }) {
  return <div className="text-4xl md:text-5xl font-extrabold">{value}</div>;
}

function DiffUI({
  diff,
  isPositive,
  children,
}: {
  diff: string;
  isPositive?: boolean;
  children?: React.ReactNode;
}) {
  const cleanDiff = diff.replace(/^-/, '');

  return (
    <div
      className={`${
        isPositive ? 'text-green-500' : 'text-red-500'
      } text-lg flex gap-1 items-center`}
    >
      <span>
        {isPositive ? '+' : '-'}
        {cleanDiff}
      </span>
      {children && <span className="text-gray-400">{children}</span>}
    </div>
  );
}

function EmployeeCard({
  name,
  position,
  status,
}: {
  name: string;
  position: string;
  status: string;
}) {
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex gap-2">
        <div>
          <Avatar sx={{ width: 30, height: 30 }}>{name.charAt(0)}</Avatar>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">{name}</span>
          <span className="text-gray-400 text-sm">{position}</span>
        </div>
      </div>
      <div
        className={` flex justify-center  w-32 py-2 rounded-md ${
          status === 'Present'
            ? 'bg-green-500'
            : status === 'Permitted'
            ? 'bg-yellow-500'
            : 'bg-red-500'
        }`}
      >
        <span>{status}</span>
      </div>
    </div>
  );
}

function ProjectProgressCard() {
  const [activeTab, setActiveTab] = useState<TabKey>('General');
  const progressData: Record<TabKey, { name: string; value: number }[]> = {
    General: [
      { name: 'E-Commerce Platform', value: 0.86 },
      { name: 'CRM System', value: 0.3 },
      { name: 'Mobile App', value: 0.95 },
      { name: 'E-Commerce Platform', value: 0.86 },
      { name: 'CRM System', value: 0.3 },
      { name: 'Mobile App', value: 0.95 },
    ],
    Frontend: [
      { name: 'Landing Page', value: 0.4 },
      { name: 'Dashboard UI', value: 0.8 },
      { name: 'Profile Screen', value: 0.65 },
      { name: 'E-Commerce Platform', value: 0.86 },
      { name: 'CRM System', value: 0.3 },
      { name: 'Mobile App', value: 0.95 },
    ],
    Backend: [
      { name: 'Auth Service', value: 0.75 },
      { name: 'Payment API', value: 0.5 },
      { name: 'Database Schema', value: 0.9 },
      { name: 'E-Commerce Platform', value: 0.86 },
      { name: 'CRM System', value: 0.3 },
      { name: 'Mobile App', value: 0.95 },
    ],
  };
  const tabs: TabKey[] = ['General', 'Frontend', 'Backend'];
  return (
    <div className="flex flex-col">
      <div className="flex gap-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition text-green-700 ${
              activeTab === tab ? 'bg-dark-sidebar-active text-white' : ''
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {progressData[activeTab].map((project, index) => (
          <div key={index} className="flex gap-4 items-center">
            <span className="min-w-[120px] max-w-[200px] truncate">
              {project.name}
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${project.value * 100}%` }}
              ></div>
            </div>
            <span className="w-[40px] text-right">
              {Math.round(project.value * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectScheduleCard() {
  const projectScheduleData = [
    {
      name: 'Frontend Review',
      project: 'Ecommerce Platform',
      status: 'Upcoming',
      date: 'Sep 15, 2025',
    },
    {
      name: 'Database Migration',
      project: 'CRM System',
      status: 'Accepted',
      date: 'Aug 18, 2025',
    },
    {
      name: 'PQM Testing',
      project: 'CRM System',
      status: 'Pending',
      date: 'Sep 5, 2025',
    },
    {
      name: 'Backend Testing',
      project: 'CRM System',
      status: 'Accepted',
      date: 'Sep 10, 2025',
    },
    {
      name: 'E-Commerce Platform',
      project: 'CRM System',
      status: 'Accepted',
      date: 'Sep 12, 2025',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {projectScheduleData.map((item, idx) => (
        <div key={idx} className="flex justify-between items-center text-sm">
          <div>
            <div className="font-bold text-xl ">{item.name}</div>
            <div className="text-gray-500 text-xl">{item.project}</div>
          </div>
          <div className="flex flex-col w-32 items-start gap-2">
            <span
              className={`px-4 py-1 text-white text-xl rounded-full w-full ${
                item.status === 'Accepted'
                  ? 'bg-green-500'
                  : item.status === 'Pending'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
            >
              {item.status}
            </span>
            <span className="text-gray-400 text-lg">{item.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
