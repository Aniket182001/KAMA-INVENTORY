'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import styles from './reports.module.css';

export default function ReportsMenuPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumbNav}>
        <Link href="/" className={styles.homeCrumb}>Home</Link>
        <span className={styles.separator}>/</span>
        <Link href="/main" className={styles.navLink}>Main Screen</Link>
        <span className={styles.separator}>/</span>
        <span className={styles.currentCrumb}>Reports</span>
      </div>

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Reports Menu</h1>
          <p className={styles.subtitle}>
            Select an analytics and variance tracking report from the available reporting modules below.
          </p>
        </div>
        <div className="page-header-actions">
          <Button variant="secondary" onClick={() => router.push('/main')}>
            Return to Main Screen
          </Button>
          <Button variant="ghost" onClick={() => router.push('/')}>
            Exit to Home
          </Button>
        </div>
      </div>

      {/* Reports Selection Grid */}
      <div className={styles.reportsGrid}>
        {/* Report 1: Active */}
        <Card padding="lg" className={styles.reportCard}>
          <div className={styles.reportCardHeader}>
            <span className={styles.reportNumberBadge}>Report 1</span>
            <span className={styles.badgeActive}>Active</span>
          </div>

          <h2 className={styles.reportCardTitle}>
            Production Order Process Variance & Timing Report
          </h2>

          <p className={styles.reportCardDesc}>
            Compare submitted Production Orders against Process Master standards to track completed, delayed, and missed manufacturing processes per batch.
          </p>

          <div className={styles.reportCardMeta}>
            <span className={styles.metaItem}>Source: Transaction Master + Process Master</span>
            <span className={styles.metaItem}>Level: PO & Production Batch</span>
          </div>

          <div className={styles.reportCardActions}>
            <Link href="/reports/po-variance" style={{ width: '100%' }}>
              <Button variant="primary" style={{ width: '100%' }}>
                Open Report 1
              </Button>
            </Link>
          </div>
        </Card>

        {/* Report 2: Coming Soon / Inactive */}
        <Card padding="lg" className={`${styles.reportCard} ${styles.reportCardDisabled}`}>
          <div className={styles.reportCardHeader}>
            <span className={styles.reportNumberBadge}>Report 2</span>
            <span className={styles.badgeComingSoon}>Coming Soon</span>
          </div>

          <h2 className={styles.reportCardTitle}>
            Quality & Rejection Performance Report
          </h2>

          <p className={styles.reportCardDesc}>
            Comprehensive analysis of defect patterns, rejection reasons, and rework turnaround times across manufacturing departments.
          </p>

          <div className={styles.reportCardMeta}>
            <span className={styles.metaItem}>Source: Quality Data</span>
            <span className={styles.metaItem}>Status: Under Development</span>
          </div>

          <div className={styles.reportCardActions}>
            <Button variant="secondary" disabled style={{ width: '100%' }}>
              Coming Soon
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
