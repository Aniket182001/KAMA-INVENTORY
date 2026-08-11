'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { SearchBar } from '@/components/ui/SearchBar';
import { Table } from '@/components/ui/Table';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/components/ui/Toast';
import styles from './skus.module.css';

interface CustomerOption {
  id: string;
  name: string;
  customerId: string;
}

interface SkuItem {
  id: string;
  skuCode: string;
  name: string;
  category: string | null;
  description: string | null;
  customerId: string;
  isActive: boolean;
  customer: {
    id: string;
    name: string;
    customerId: string;
  };
  processes: Array<{
    id: string;
    sequence: number;
    process: {
      processCode: string;
      processName: string;
    };
  }>;
}

export default function SkusPage() {
  const { showToast } = useToast();
  const [skus, setSkus] = useState<SkuItem[]>([]);
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [includeInactive, setIncludeInactive] = useState(true);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSku, setSelectedSku] = useState<SkuItem | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    skuCode: '',
    name: '',
    category: '',
    description: '',
    customerId: '',
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Confirm dialog
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    sku: SkuItem | null;
  }>({ isOpen: false, sku: null });
  const [toggling, setToggling] = useState(false);

  // Fetch customers dropdown options
  useEffect(() => {
    async function loadCustomers() {
      try {
        const res = await fetch('/api/customers?includeInactive=true');
        const json = await res.json();
        if (res.ok) setCustomers(json.data || []);
      } catch (e) {
        console.error('Failed to load customers list');
      }
    }
    loadCustomers();
  }, []);

  const fetchSkus = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (selectedCustomerId) params.set('customerId', selectedCustomerId);
      if (includeInactive) params.set('includeInactive', 'true');

      const res = await fetch(`/api/skus?${params.toString()}`);
      const json = await res.json();
      if (res.ok) {
        setSkus(json.data || []);
      } else {
        showToast('error', json.error || 'Failed to fetch SKUs');
      }
    } catch (err: any) {
      showToast('error', 'Network error fetching SKUs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkus();
  }, [search, selectedCustomerId, includeInactive]);

  const handleOpenAdd = () => {
    setFormData({
      skuCode: '',
      name: '',
      category: '',
      description: '',
      customerId: customers.length > 0 ? customers[0].id : '',
    });
    setFormError('');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (item: SkuItem) => {
    setSelectedSku(item);
    setFormData({
      skuCode: item.skuCode,
      name: item.name,
      category: item.category || '',
      description: item.description || '',
      customerId: item.customerId,
    });
    setFormError('');
    setIsEditModalOpen(true);
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/skus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.ok) {
        showToast('success', `SKU '${json.data.skuCode}' created successfully`);
        setIsAddModalOpen(false);
        fetchSkus();
      } else {
        setFormError(json.error || 'Failed to create SKU');
      }
    } catch (err: any) {
      setFormError('Network error saving SKU');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSku) return;
    setFormError('');
    setSubmitting(true);
    try {
      const res = await fetch(`/api/skus/${selectedSku.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.ok) {
        showToast('success', `SKU '${json.data.skuCode}' updated successfully`);
        setIsEditModalOpen(false);
        fetchSkus();
      } else {
        setFormError(json.error || 'Failed to update SKU');
      }
    } catch (err: any) {
      setFormError('Network error updating SKU');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmToggleActive = async () => {
    if (!confirmDialog.sku) return;
    setToggling(true);
    try {
      const res = await fetch(`/api/skus/${confirmDialog.sku.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (res.ok) {
        showToast('success', json.message || 'SKU status updated');
        setConfirmDialog({ isOpen: false, sku: null });
        fetchSkus();
      } else {
        showToast('error', json.error || 'Failed to update status');
      }
    } catch (err: any) {
      showToast('error', 'Network error updating SKU status');
    } finally {
      setToggling(false);
    }
  };

  const columns = [
    {
      key: 'skuCode',
      header: 'SKU Code',
      render: (item: SkuItem) => (
        <Link href={`/skus/${item.id}`} className={styles.codeLink}>
          {item.skuCode}
        </Link>
      ),
    },
    { key: 'name', header: 'SKU Name' },
    {
      key: 'customer',
      header: 'Customer',
      render: (item: SkuItem) =>
        item.customer ? (
          <span>
            {item.customer.name} ({item.customer.customerId})
          </span>
        ) : (
          '—'
        ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (item: SkuItem) =>
        item.category ? (
          <span className={styles.catTag}>{item.category}</span>
        ) : (
          <span className={styles.mutedText}>—</span>
        ),
    },
    {
      key: 'processesCount',
      header: 'Assigned Processes',
      render: (item: SkuItem) => (
        <span className={styles.routingTag}>
          {item.processes.length > 0
            ? `${item.processes.length} work centres`
            : 'Unassigned'}
        </span>
      ),
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (item: SkuItem) => (
        <Badge variant={item.isActive ? 'success' : 'default'}>
          {item.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: SkuItem) => (
        <div className={styles.actionButtons}>
          <Link href={`/skus/${item.id}`}>
            <Button size="sm" variant="primary">Manage Routing</Button>
          </Link>
          <Button size="sm" variant="ghost" onClick={() => handleOpenEdit(item)}>
            Edit
          </Button>
          <Button
            size="sm"
            variant={item.isActive ? 'danger' : 'secondary'}
            onClick={() => setConfirmDialog({ isOpen: true, sku: item })}
          >
            {item.isActive ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <h1>SKU Master & Process Routing</h1>
          <p className={styles.subtitle}>
            Manage jewellery product catalog and process flow maps ({skus.length} records)
          </p>
        </div>
        <div className="page-header-actions">
          <Button variant="primary" onClick={handleOpenAdd}>
            + Add New SKU
          </Button>
        </div>
      </div>

      <Card padding="md">
        <div className={styles.toolbar}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search SKU code, name, category..."
          />
          <div className={styles.filterGroup}>
            <Select
              options={[
                { value: '', label: 'All Customers' },
                ...customers.map((c) => ({
                  value: c.id,
                  label: `${c.name} (${c.customerId})`,
                })),
              ]}
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
            />
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={includeInactive}
                onChange={(e) => setIncludeInactive(e.target.checked)}
              />
              Show Inactive
            </label>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading SKU catalog..." />
        ) : skus.length === 0 ? (
          <EmptyState
            title="No SKUs found"
            description={
              search || selectedCustomerId
                ? 'Try adjusting your filters or search query.'
                : 'Create your first SKU to get started.'
            }
            action={
              <Button variant="primary" onClick={handleOpenAdd}>
                Add SKU
              </Button>
            }
          />
        ) : (
          <Table columns={columns} data={skus} />
        )}
      </Card>

      {/* Add SKU Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New SKU"
      >
        <form onSubmit={handleSaveAdd} className={styles.form}>
          {formError && <div className={styles.formError}>{formError}</div>}
          <Input
            label="SKU Code (e.g. SKU-RING-001)"
            value={formData.skuCode}
            onChange={(e) => setFormData({ ...formData, skuCode: e.target.value })}
            placeholder="e.g. SKU-RING-001"
            required
          />
          <Input
            label="SKU Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Diamond Solitaire Gold Ring"
            required
          />
          <Select
            label="Customer"
            options={customers.map((c) => ({
              value: c.id,
              label: `${c.name} (${c.customerId})`,
            }))}
            value={formData.customerId}
            onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
            required
          />
          <Input
            label="Category / Type (e.g. Ring, Pendant, Bracelet)"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="e.g. Ring"
          />
          <Input
            label="Description (Optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Optional design specifications"
          />
          <div className={styles.modalActions}>
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={submitting}>
              Save SKU
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit SKU Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit SKU: ${selectedSku?.skuCode || ''}`}
      >
        <form onSubmit={handleSaveEdit} className={styles.form}>
          {formError && <div className={styles.formError}>{formError}</div>}
          <Input
            label="SKU Code"
            value={formData.skuCode}
            onChange={(e) => setFormData({ ...formData, skuCode: e.target.value })}
            required
          />
          <Input
            label="SKU Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Select
            label="Customer"
            options={customers.map((c) => ({
              value: c.id,
              label: `${c.name} (${c.customerId})`,
            }))}
            value={formData.customerId}
            onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
            required
          />
          <Input
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <div className={styles.modalActions}>
            <Button type="button" variant="secondary" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={submitting}>
              Update SKU
            </Button>
          </div>
        </form>
      </Modal>

      {/* Deactivate Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, sku: null })}
        onConfirm={handleConfirmToggleActive}
        title={`${confirmDialog.sku?.isActive ? 'Deactivate' : 'Activate'} SKU`}
        message={`Are you sure you want to ${
          confirmDialog.sku?.isActive ? 'deactivate' : 'activate'
        } SKU '${confirmDialog.sku?.skuCode}' (${confirmDialog.sku?.name})?`}
        confirmLabel={confirmDialog.sku?.isActive ? 'Deactivate' : 'Activate'}
        variant={confirmDialog.sku?.isActive ? 'danger' : 'warning'}
        isLoading={toggling}
      />
    </>
  );
}
