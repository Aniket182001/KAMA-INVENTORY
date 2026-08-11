'use client';
import Link from 'next/link';
import styles from './Header.module.css';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface HeaderProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
}

export function Header({ title, breadcrumbs }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className={styles.breadcrumbs}>
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className={styles.breadcrumbItem}>
                {crumb.href ? (
                  <Link href={crumb.href} className={styles.breadcrumbLink}>{crumb.label}</Link>
                ) : (
                  <span className={styles.breadcrumbText}>{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <span className={styles.separator}>/</span>}
              </span>
            ))}
          </nav>
        )}
        {!breadcrumbs && <h1 className={styles.title}>{title}</h1>}
      </div>
      <div className={styles.right}>
        {/* Placeholder for future user menu */}
      </div>
    </header>
  );
}

export default Header;
