import { SvgIconProps } from '@mui/material';
import { ComponentType } from 'react';

export interface SidebarItemData {
  label: string;
  path: string;
  icon: ComponentType<SvgIconProps>; // Accepts MUI icons
}

export interface SidebarSectionData {
  title: string;
  items: SidebarItemData[];
}
