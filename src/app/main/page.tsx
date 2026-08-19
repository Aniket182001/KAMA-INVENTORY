'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import styles from './main.module.css';

export default function MainScreenPage() {
  const mainOptions = [
    {
      index: '1',
      title: 'Master File Creation',
      href: '/master-file',
      isExit: false,
    },
    {
      index: '2',
      title: 'Process Creation',
      href: '/process-creation',
      isExit: false,
    },
    {
      index: '3',
      title: 'Transaction Master File',
      href: '/transaction-master',
      isExit: false,
    },
    {
      index: '4',
      title: 'Reports',
      href: '/reports',
      isExit: false,
    },
    {
      index: '5',
      title: 'Exit',
      href: '/',
      isExit: true,
    },
  ];

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <Link href="/" className={styles.homeLink}>
            <span className={styles.homeIcon}>⌂</span>
            <span>Home</span>
          </Link>
          <span className={styles.brandTag}>KAMA</span>
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>Main Screen</h1>
          <p className={styles.subtitle}>
            Jewellery Manufacturing — Primary System Navigation
          </p>
        </div>

        <div className={styles.verticalList}>
          {mainOptions.map((opt) => (
            <Link key={opt.title} href={opt.href} className={styles.cardLink}>
              <Card padding="md" className={`${styles.optionCard} ${opt.isExit ? styles.exitOptionCard : ''}`}>
                <div className={styles.leftSection}>
                  <span className={styles.optionNumber}>{opt.index}</span>
                  <h2 className={styles.optionTitle}>{opt.title}</h2>
                </div>
                <div className={styles.rightSection}>
                  <span className={styles.actionArrow}>→</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
