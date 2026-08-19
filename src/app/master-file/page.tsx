'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import styles from './master-file.module.css';

export default function MasterFileCreationPage() {
  const options = [
    {
      index: '1',
      title: 'Add',
      href: '/master-file/add',
      isExit: false,
    },
    {
      index: '2',
      title: 'Update',
      href: '/master-file/update',
      isExit: false,
    },
    {
      index: '3',
      title: 'Delete',
      href: '/master-file/delete',
      isExit: false,
    },
    {
      index: '4',
      title: 'Exit',
      href: '/main',
      isExit: true,
    },
  ];

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.container}>
        <div className={styles.breadcrumbNav}>
          <Link href="/" className={styles.homeLink}>⌂ Home</Link>
          <span className={styles.crumbSep}>/</span>
          <Link href="/main">Main Screen</Link>
          <span className={styles.crumbSep}>/</span>
          <span className={styles.crumbActive}>Master File Creation</span>
        </div>

        <div className={styles.header}>
          <div className={styles.brandRow}>
            <span className={styles.brandTag}>KAMA</span>
          </div>
          <h1 className={styles.title}>Master File Creation</h1>
          <p className={styles.subtitle}>
            Select an action to manage the KAMA Master File dataset.
          </p>
        </div>

        <div className={styles.verticalList}>
          {options.map((opt) => (
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
