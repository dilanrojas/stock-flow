import {
  ArchiveBox,
  ArrowsRightLeft,
  ShoppingCart,
  Squares,
  Swatch,
  Tag,
} from '../../src/assets/icons';
import type { SidebarItem } from '../types/sidebar-item';

export const appSections: SidebarItem[] = [
  {
    icon: Squares,
    label: 'Dashboard',
    linkTo: '/dashboard',
  },
  {
    icon: ArchiveBox,
    label: 'Products',
    linkTo: '/products',
  },
  {
    icon: Swatch,
    label: 'Categories',
    linkTo: '/categories',
  },
  {
    icon: Tag,
    label: 'Sales',
    linkTo: '/sales',
  },
  {
    icon: ShoppingCart,
    label: 'Purchases',
    linkTo: '/purchases',
  },
  {
    icon: ArrowsRightLeft,
    label: 'Movements',
    linkTo: '/movements',
  },
];
