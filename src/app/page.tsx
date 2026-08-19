'use client';

import Link from 'next/link';
import styles from './landing.module.css';

export default function KamaLandingPage() {
  return (
    <div className={styles.landingWrapper}>
      <div className={styles.heroContainer}>
        {/* Subtle decorative brand emblem */}
        <div className={styles.emblemContainer}>
          <div className={styles.emblemLine} />
          <span className={styles.emblemDiamond}>◆</span>
          <div className={styles.emblemLine} />
        </div>

        {/* Big KAMA Text */}
        <h1 className={styles.brandTitle}>KAMA</h1>
        <p className={styles.brandSubtitle}>JEWELLERY MANUFACTURING SYSTEM</p>
        <p className={styles.brandDescription}>
          Production Monitoring, Work Centre Tracking &amp; Alert Management
        </p>

        {/* Enter Button */}
        <div className={styles.ctaContainer}>
          <Link href="/main" className={styles.enterButton}>
            <span className={styles.enterButtonText}>Enter Main Screen</span>
            <span className={styles.enterButtonArrow}>→</span>
          </Link>
        </div>

        {/* Footer Meta */}
        <div className={styles.landingFooter}>
          <span>Operational Control &amp; Master Data Foundation</span>
        </div>
      </div>
    </div>
  );
}
