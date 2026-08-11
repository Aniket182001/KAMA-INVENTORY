'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { formatDate } from '@/lib/utils';
import styles from './page.module.css';

interface DashboardData {
  counts: {
    customers: number;
    skus: number;
    processes: number;
    rejections: number;
  };
  recent: {
    customers: Array<{ id: string; customerId: string; name: string; createdAt: string }>;
    skus: Array<{ id: string; skuCode: string; name: string; customer: { name: string } }>;
    rejections: Array<{
      id: string;
      rejectionCount: number;
      rejectionReason: string;
      rejectionDate: string;
      customer: { name: string };
      sku: { skuCode: string } | null;
    }>;
  };
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const res = await fetch('/api/dashboard/stats');
        const json = await res.json();
        if (res.ok) {
          setData(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p className={styles.subtitle}>
            KAMA Production Monitor — Master Data & Operational Foundation
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching live database statistics..." />
      ) : !data ? (
        <Card padding="md">
          <p className={styles.errorText}>Unable to load live database metrics.</p>
        </Card>
      ) : (
        <>
          {/* Live Stat Cards */}
          <div className={styles.grid}>
            <Card padding="md">
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Total Customers</span>
                <span className={styles.statValue}>{data.counts.customers}</span>
                <Link href="/customers" className={styles.statLink}>
                  View Customers →
                </Link>
              </div>
            </Card>

            <Card padding="md">
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Total SKUs</span>
                <span className={styles.statValue}>{data.counts.skus}</span>
                <Link href="/skus" className={styles.statLink}>
                  View SKU Catalog →
                </Link>
              </div>
            </Card>

            <Card padding="md">
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Work Centres</span>
                <span className={styles.statValue}>{data.counts.processes}</span>
                <Link href="/processes" className={styles.statLink}>
                  View Work Centres →
                </Link>
              </div>
            </Card>

            <Card padding="md">
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Rejection Logs</span>
                <span className={styles.statValue}>{data.counts.rejections}</span>
                <Link href="/rejections" className={styles.statLink}>
                  View Rejections →
                </Link>
              </div>
            </Card>
          </div>

          {/* Recent Records Lists */}
          <div className={styles.recentGrid}>
            {/* Recent Customers */}
            <Card padding="md">
              <div className={styles.cardHeader}>
                <h3>Recent Customers</h3>
                <Link href="/customers">
                  <Button size="sm" variant="ghost">View All</Button>
                </Link>
              </div>
              {data.recent.customers.length === 0 ? (
                <p className={styles.emptyText}>No customers registered yet.</p>
              ) : (
                <div className={styles.list}>
                  {data.recent.customers.map((c) => (
                    <div key={c.id} className={styles.listItem}>
                      <div>
                        <Link href={`/customers/${c.id}`} className={styles.itemTitleLink}>
                          {c.name}
                        </Link>
                        <span className={styles.itemMeta}>ID: {c.customerId}</span>
                      </div>
                      <span className={styles.dateText}>{formatDate(c.createdAt)}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Recent SKUs */}
            <Card padding="md">
              <div className={styles.cardHeader}>
                <h3>Recent SKUs</h3>
                <Link href="/skus">
                  <Button size="sm" variant="ghost">View All</Button>
                </Link>
              </div>
              {data.recent.skus.length === 0 ? (
                <p className={styles.emptyText}>No SKUs added yet.</p>
              ) : (
                <div className={styles.list}>
                  {data.recent.skus.map((s) => (
                    <div key={s.id} className={styles.listItem}>
                      <div>
                        <Link href={`/skus/${s.id}`} className={styles.itemTitleLink}>
                          {s.skuCode}
                        </Link>
                        <span className={styles.itemMeta}>{s.name}</span>
                      </div>
                      <span className={styles.badgeSm}>{s.customer.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Recent Rejections */}
            <Card padding="md">
              <div className={styles.cardHeader}>
                <h3>Recent Quality Rejections</h3>
                <Link href="/rejections">
                  <Button size="sm" variant="ghost">View All</Button>
                </Link>
              </div>
              {data.recent.rejections.length === 0 ? (
                <p className={styles.emptyText}>No rejection logs recorded yet.</p>
              ) : (
                <div className={styles.list}>
                  {data.recent.rejections.map((r) => (
                    <div key={r.id} className={styles.listItem}>
                      <div>
                        <span className={styles.reasonText}>{r.rejectionReason}</span>
                        <span className={styles.itemMeta}>
                          {r.customer.name} {r.sku ? `• ${r.sku.skuCode}` : ''}
                        </span>
                      </div>
                      <span className={styles.qtyTag}>{r.rejectionCount} pcs</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </>
      )}
    </>
  );
}
