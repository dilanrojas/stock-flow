import { Link } from 'react-router-dom';
import type { SidebarItem as SidebarItemType } from '../../../lib/types/sidebar-item';

import styles from './sidebar-item.module.css';

export default function SidebarItem({ icon: Icon, label, linkTo, active }: SidebarItemType) {
  return (
    <Link
      to={linkTo}
      className={styles.sidebarItem}
    >
      <button
        type='button'
        className={`${styles.sidebarItemBtn} ${active ? styles.active : ''}`}
      >
        <span>
          <Icon />
        </span>
        <span>{label}</span>
      </button>
    </Link>
  );
}
