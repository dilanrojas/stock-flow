import { useLocation } from 'react-router-dom';
import { appSections } from '../../../lib/constants/app-sections';
import LogoutButton from '../auth/logout-button';
import Logo from '../ui/logo';
import styles from './sidebar.module.css';
import SidebarItem from './sidebar-item';

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className={styles.sidebar}>
      <header className={styles.header}>
        <Logo />
      </header>
      {appSections.length > 0 && (
        <nav className={styles.nav}>
          <ul className={styles.list}>
            {appSections.map((section) => (
              <li key={section.label}>
                <SidebarItem
                  icon={section.icon}
                  label={section.label}
                  linkTo={section.linkTo}
                  active={pathname?.toLowerCase().includes(section.label.toLowerCase())}
                />
              </li>
            ))}
          </ul>
        </nav>
      )}
      <footer className={styles.footer}>
        <nav className={styles.footerNav}>
          <ul className={styles.footerList}>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </footer>
    </aside>
  );
}
