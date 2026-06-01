import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar';

import styles from './app-layout.module.css';

export default function AppLayout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <Outlet />
    </div>
  );
}
