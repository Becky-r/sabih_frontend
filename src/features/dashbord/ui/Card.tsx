import { SvgIconProps } from '@mui/material';
import { ComponentType } from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  icon?: ComponentType<SvgIconProps>;
  classname?: string;
}

export default function Card({
  title,
  children,
  icon: Icon,
  classname,
}: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-dark-card rounded-2xl p-4 shadow-lg h-full flex flex-col gap-3 dark:bg-dark-surface ${classname}`}
    >
      <div className="flex justify-between">
        <h4 className="text-2xl text-gray-500 mb-2">
          {title ? `${title}` : ''}
        </h4>
        {Icon && <Icon />}
      </div>

      {children}
    </div>
  );
}
