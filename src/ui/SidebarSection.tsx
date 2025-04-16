import SidebarItem from './SidebarItem';
import { SidebarSectionData } from './types';

interface SidebarSectionProps {
  section: SidebarSectionData;
  collapsed: boolean;
  setToggled: (value: boolean) => void;
  isMdUp: boolean;
}

export default function SidebarSection({
  section,
  collapsed,
  setToggled,
  isMdUp,
}: SidebarSectionProps) {
  return (
    <div className="shadow">
      {!collapsed && (
        <div className="text-xl py-2 px-3 mb-1">{section.title}</div>
      )}
      <div className="flex flex-col gap-1 ">
        {section.items.map((item) => (
          <SidebarItem
            key={item.label}
            {...item}
            collapsed={collapsed}
            onClick={() => !isMdUp && setToggled(false)}
          />
        ))}
      </div>
    </div>
  );
}
