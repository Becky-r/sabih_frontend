import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import BarChartIcon from '@mui/icons-material/BarChart';
import AppsIcon from '@mui/icons-material/Apps';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CodeIcon from '@mui/icons-material/Code';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import InfoIcon from '@mui/icons-material/Info';
import { SidebarSectionData } from './types';
import { MdAppRegistration } from "react-icons/md"
import { HiOutlineBriefcase } from "react-icons/hi"
import { HiOutlineClipboardList } from "react-icons/hi"
import { HiOutlineUserGroup } from "react-icons/hi"
import {HiOutlineDocumentReport } from "react-icons/hi"
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2"
export const sidebarSections: SidebarSectionData[] = [
  {
    title: 'Overview',
    items: [
      { icon: DashboardIcon, label: 'Dashboard', path: '/dashboard' },
      { icon: GroupsIcon, label: 'Attendance', path: '/attendance' },
      { icon:  HiOutlineBriefcase, label: 'Projects',path: '/projects' },
      { icon: HiOutlineClipboardList, label: 'TaskAllocation',path: '/TaskAllocation' },
      { icon: HiOutlineUserGroup, label: 'Client',path: '/Client' },
      { icon: MdAppRegistration , label: 'Registration',path: '/Registration' },
      
      { icon: HiOutlineChatBubbleOvalLeft , label: 'Chat',path: '/Chat' },
    ],
  },
  {
    title: 'Progress',
    items: [
      { icon: AppsIcon, label: 'General', path: '/general' },
      { icon: PhoneAndroidIcon, label: 'Frontend', path: '/frontend' },
      { icon: CodeIcon, label: 'Backend', path: '/backend' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { icon: CalendarMonthIcon, label: 'Schedules', path: '/schedules' },
      {
        icon: DesignServicesIcon,
        label: 'Figma Designs',
        path: '/figma-designs',
      },
      { icon: InfoIcon, label: 'Information', path: '/info' },
      { icon: HiOutlineDocumentReport , label: 'Report',path: '/Report' },
    ],
  },
];
