'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const navItems = [
  { label: 'KAMA Welcome', href: '/', icon: '✧' },
  { label: 'Main Screen', href: '/main', icon: '◫' },
  { label: 'Master File', href: '/master-file', icon: '📁' },
  { label: 'Dashboard', href: '/dashboard', icon: '📈' },
  { label: 'Customers', href: '/customers', icon: '◆' },
  { label: 'SKUs', href: '/skus', icon: '▦' },
  { label: 'Processes', href: '/processes', icon: '⚙' },
  { label: 'Rejections', href: '/rejections', icon: '⊘' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <span className={styles.logo}>KAMA</span>
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
