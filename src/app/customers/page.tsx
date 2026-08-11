'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SearchBar } from '@/components/ui/SearchBar';
import { Table } from '@/components/ui/Table';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/components/ui/Toast';
import styles from './customers.module.css';

interface CustomerItem {
  id: string;
  customerId: string;
  name: string;
  notes: string | null;
  isActive: boolean;
  _count?: {
    skus: number;
    rejections: number;
  };
}

export default function CustomersPage() {
  const { showToast } = useToast();
  const [customers, setCustomers] = useState<CustomerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [includeInactive, setIncludeInactive] = useState(true);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerItem | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    customerId: '',
    name: '',
    notes: '',
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    customer: CustomerItem | null;
  }>({ isOpen: false, customer: null });
  const [toggling, setToggling] = useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (includeInactive) params.set('includeInactive', 'true');

      const res = await fetch(`/api/customers?${params.toString()}`);
      const json = await res.json();
      if (res.ok) {
        setCustomers(json.data || []);
      } else {
        showToast('error', json.error || 'Failed to fetch customers');
      }
    } catch (err: any) {
      showToast('error', 'Network error fetching customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search, includeInactive]);

  const handleOpenAdd = () => {
    setFormData({ customerId: '', name: '', notes: '' });
    setFormError('');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (item: CustomerItem) => {
    setSelectedCustomer(item);
    setFormData({
      customerId: item.customerId,
      name: item.name,
      notes: item.notes || '',
    });
    setFormError('');
    setIsEditModalOpen(true);
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.ok) {
        showToast('success', `Customer '${json.data.name}' created successfully`);
        setIsAddModalOpen(false);
        fetchCustomers();
      } else {
        setFormError(json.error || 'Failed to create customer');
      }
    } catch (err: any) {
      setFormError('Network error saving customer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;
    setFormError('');
    setSubmitting(true);
    try {
      const res = await fetch(`/api/customers/${selectedCustomer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.ok) {
        showToast('success', `Customer '${json.data.name}' updated successfully`);
        setIsEditModalOpen(false);
        fetchCustomers();
      } else {
        setFormError(json.error || 'Failed to update customer');
      }
    } catch (err: any) {
      setFormError('Network error updating customer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmToggleActive = async () => {
    if (!confirmDialog.customer) return;
    setToggling(true);
    try {
      const res = await fetch(`/api/customers/${confirmDialog.customer.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (res.ok) {
        showToast('success', json.message || 'Customer status updated');
        setConfirmDialog({ isOpen: false, customer: null });
        fetchCustomers();
      } else {
        showToast('error', json.error || 'Failed to update customer status');
      }
    } catch (err: any) {
      showToast('error', 'Network error updating customer status');
    } finally {
      setToggling(false);
    }
  };

  const columns = [
    {
      key: 'customerId',
      header: 'Customer ID',
      render: (item: CustomerItem) => (
        <Link href={`/customers/${item.id}`} className={styles.codeLink}>
          {item.customerId}
        </Link>
      ),
    },
    { key: 'name', header: 'Customer Name' },
    {
      key: 'notes',
      header: 'Notes',
      render: (item: CustomerItem) =>
        item.notes ? <span>{item.notes}</span> : <span className={styles.mutedText}>—</span>,
    },
    {
      key: 'skus',
      header: 'SKUs',
      render: (item: CustomerItem) => (
        <span className={styles.countBadge}>{item._count?.skus || 0} SKUs</span>
      ),
    },
    {
      key: 'rejections',
      header: 'Rejections',
      render: (item: CustomerItem) => (
        <span className={styles.countBadge}>{item._count?.rejections || 0}</span>
      ),
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (item: CustomerItem) => (
        <Badge variant={item.isActive ? 'success' : 'default'}>
          {item.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: CustomerItem) => (
        <div className={styles.actionButtons}>
          <Link href={`/customers/${item.id}`}>
            <Button size="sm" variant="ghost">View</Button>
          </Link>
          <Button size="sm" variant="ghost" onClick={() => handleOpenEdit(item)}>
            Edit
          </Button>
          <Button
            size="sm"
            variant={item.isActive ? 'danger' : 'secondary'}
            onClick={() => setConfirmDialog({ isOpen: true, customer: item })}
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
          <h1>Customer Master</h1>
          <p className={styles.subtitle}>
            KAMA client directory and relationships ({customers.length} records)
          </p>
        </div>
        <div className="page-header-actions">
          <Button variant="primary" onClick={handleOpenAdd}>
            + Add New Customer
          </Button>
        </div>
      </div>

      <Card padding="md">
        <div className={styles.toolbar}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by Customer ID or Name..."
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

        {loading ? (
          <LoadingSpinner message="Loading customer directory..." />
        ) : customers.length === 0 ? (
          <EmptyState
            title="No customers found"
            description={
              search ? 'Try adjusting your search query' : 'Create your first customer to get started.'
            }
            action={
              <Button variant="primary" onClick={handleOpenAdd}>
                Add Customer
              </Button>
            }
          />
        ) : (
          <Table columns={columns} data={customers} />
        )}
      </Card>

      {/* Add Customer Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Customer"
      >
        <form onSubmit={handleSaveAdd} className={styles.form}>
          {formError && <div className={styles.formError}>{formError}</div>}
          <Input
            label="Customer ID (e.g. CUST-001)"
            value={formData.customerId}
            onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
            placeholder="e.g. CUST-001"
            required
          />
          <Input
            label="Customer Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. KAMA Jewellery Exports"
            required
          />
          <Input
            label="Notes / Comments (Optional)"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Optional internal notes"
          />
          <div className={styles.modalActions}>
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={submitting}>
              Save Customer
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Customer Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit Customer: ${selectedCustomer?.customerId || ''}`}
      >
        <form onSubmit={handleSaveEdit} className={styles.form}>
          {formError && <div className={styles.formError}>{formError}</div>}
          <Input
            label="Customer ID"
            value={formData.customerId}
            onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
            required
          />
          <Input
            label="Customer Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
          <div className={styles.modalActions}>
            <Button type="button" variant="secondary" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={submitting}>
              Update Customer
            </Button>
          </div>
        </form>
      </Modal>

      {/* Deactivate Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, customer: null })}
        onConfirm={handleConfirmToggleActive}
        title={`${confirmDialog.customer?.isActive ? 'Deactivate' : 'Activate'} Customer`}
        message={`Are you sure you want to ${
          confirmDialog.customer?.isActive ? 'deactivate' : 'activate'
        } customer '${confirmDialog.customer?.name}' (${confirmDialog.customer?.customerId})?`}
        confirmLabel={confirmDialog.customer?.isActive ? 'Deactivate' : 'Activate'}
        variant={confirmDialog.customer?.isActive ? 'danger' : 'warning'}
        isLoading={toggling}
      />
    </>
  );
}
