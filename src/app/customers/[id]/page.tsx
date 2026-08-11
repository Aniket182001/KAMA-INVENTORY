'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/components/ui/Toast';
import { formatDate } from '@/lib/utils';
import styles from './customerDetail.module.css';

interface CustomerDetail {
  id: string;
  customerId: string;
  name: string;
  notes: string | null;
  isActive: boolean;
  createdAt: string;
  skus: Array<{
    id: string;
    skuCode: string;
    name: string;
    category: string | null;
    processes: Array<{ id: string; process: { processCode: string } }>;
  }>;
  rejections: Array<{
    id: string;
    productionOrderRef: string | null;
    rejectionCount: number;
    rejectionReason: string;
    rejectionDate: string;
    sku: { skuCode: string } | null;
  }>;
}

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { showToast } = useToast();
  const [customer, setCustomer] = useState<CustomerDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomer() {
      try {
        setLoading(true);
        const res = await fetch(`/api/customers/${id}`);
        const json = await res.json();
        if (res.ok) {
          setCustomer(json.data);
        } else {
          showToast('error', json.error || 'Failed to load customer');
        }
      } catch (err) {
        showToast('error', 'Network error loading customer');
      } finally {
        setLoading(false);
      }
    }
    loadCustomer();
  }, [id]);

  if (loading) {
    return <LoadingSpinner message="Loading customer details..." />;
  }

  if (!customer) {
    return (
      <EmptyState
        title="Customer Not Found"
        description="The requested customer profile could not be loaded."
        action={
          <Link href="/customers">
            <Button variant="primary">Back to Customers</Button>
          </Link>
        }
      />
    );
  }

  const skuColumns = [
    {
      key: 'skuCode',
      header: 'SKU Code',
      render: (item: any) => (
        <Link href={`/skus/${item.id}`} className={styles.codeLink}>
          {item.skuCode}
        </Link>
      ),
    },
    { key: 'name', header: 'SKU Name' },
    {
      key: 'category',
      header: 'Category',
      render: (item: any) => item.category || '—',
    },
    {
      key: 'routing',
      header: 'Routing Sequence',
      render: (item: any) => (
        <span className={styles.routingTag}>
          {item.processes.length > 0
            ? item.processes.map((p: any) => p.process.processCode).join(' → ')
            : 'No routing assigned'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: any) => (
        <Link href={`/skus/${item.id}`}>
          <Button size="sm" variant="ghost">Manage Routing</Button>
        </Link>
      ),
    },
  ];

  const rejectionColumns = [
    {
      key: 'rejectionDate',
      header: 'Date',
      render: (item: any) => formatDate(item.rejectionDate),
    },
    {
      key: 'skuCode',
      header: 'SKU',
      render: (item: any) => item.sku?.skuCode || '—',
    },
    {
      key: 'productionOrderRef',
      header: 'Order / Batch Ref',
      render: (item: any) => item.productionOrderRef || '—',
    },
    { key: 'rejectionCount', header: 'Rejected Count' },
    { key: 'rejectionReason', header: 'Reason' },
  ];

  return (
    <>
      <div className={styles.breadcrumbNav}>
        <Link href="/customers">← Back to Customers</Link>
      </div>

      <div className="page-header">
        <div>
          <div className={styles.titleRow}>
            <h1>{customer.name}</h1>
            <Badge variant={customer.isActive ? 'success' : 'default'}>
              {customer.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <p className={styles.subtitle}>Customer ID: {customer.customerId}</p>
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <Card padding="md">
          <h3>Customer Details</h3>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Customer Business ID</span>
              <span className={styles.infoValue}>{customer.customerId}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Company Name</span>
              <span className={styles.infoValue}>{customer.name}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Registered Date</span>
              <span className={styles.infoValue}>{formatDate(customer.createdAt)}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Notes / Instructions</span>
              <span className={styles.infoValue}>{customer.notes || 'None provided'}</span>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className={styles.sectionHeader}>
            <h3>Associated SKUs ({customer.skus.length})</h3>
            <Link href="/skus">
              <Button size="sm" variant="secondary">+ Create SKU</Button>
            </Link>
          </div>

          {customer.skus.length === 0 ? (
            <p className={styles.emptyText}>No SKUs created for this customer yet.</p>
          ) : (
            <Table columns={skuColumns} data={customer.skus} />
          )}
        </Card>

        <Card padding="md">
          <h3>Historical Rejection Logs ({customer.rejections.length})</h3>
          {customer.rejections.length === 0 ? (
            <p className={styles.emptyText}>No rejection records logged for this customer.</p>
          ) : (
            <Table columns={rejectionColumns} data={customer.rejections} />
          )}
        </Card>
      </div>
    </>
  );
}
