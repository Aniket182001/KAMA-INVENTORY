'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Sidebar } from './Sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Sidebar is hidden across all screens for now (kept intact in codebase for future use)
  const SHOW_SIDEBAR = false;
  const isLandingPage = pathname === '/';

  if (!SHOW_SIDEBAR) {
    return (
      <div className="app-standalone">
        {!isLandingPage && (
          <header className="app-top-nav">
            <div className="app-top-nav-inner">
              <Link href="/" className="app-brand-link">
                <span className="app-brand-logo">KAMA</span>
                <span className="app-brand-sub">Jewellery Manufacturing</span>
              </Link>
              <div className="app-top-nav-links">
                <Link href="/" className="app-home-link">
                  <span className="app-home-icon">⌂</span>
                  <span>Home</span>
                </Link>
                <Link href="/main" className="app-nav-link">
                  <span>Main Screen</span>
                </Link>
                <Link href="/dashboard" className="app-nav-link">
                  <span>Dashboard</span>
                </Link>
              </div>
            </div>
          </header>
        )}
        <main className={isLandingPage ? "app-main-landing" : "app-main-standalone"}>
          <div className={isLandingPage ? "app-content-landing" : "app-content-standalone"}>
            {children}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <div className="app-content">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AppShell;
