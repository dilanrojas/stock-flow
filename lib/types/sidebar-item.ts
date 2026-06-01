import type { ComponentType } from 'react';

export type SidebarItem = {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  linkTo: string;
  active?: boolean;
};
