'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { SearchBar } from '@/components/ui/SearchBar';
import { Table } from '@/components/ui/Table';
import { Modal } from '@/components/ui/Modal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/components/ui/Toast';
import { formatDate } from '@/lib/utils';
import styles from './rejections.module.css';

interface CustomerOption {
  id: string;
  name: string;
  customerId: string;
}

interface SkuOption {
  id: string;
  skuCode: string;
  name: string;
  customerId: string;
}

interface RejectionItem {
  id: string;
  customerId: string;
  skuId: string | null;
  productionOrderRef: string | null;
  rejectionCount: number;
  rejectionReason: string;
  rejectionDate: string;
  notes: string | null;
  customer: {
    name: string;
    customerId: string;
  };
  sku: {
    skuCode: string;
    name: string;
  } | null;
}

export default function RejectionsPage() {
  const { showToast } = useToast();
  const [rejections, setRejections] = useState<RejectionItem[]>([]);
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [skus, setSkus] = useState<SkuOption[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [filterCustomerId, setFilterCustomerId] = useState('');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRejection, setSelectedRejection] = useState<RejectionItem | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    customerId: '',
    skuId: '',
    productionOrderRef: '',
    rejectionCount: 1,
    rejectionReason: '',
    rejectionDate: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Delete confirm dialog
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    rejection: RejectionItem | null;
  }>({ isOpen: false, rejection: null });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadOptions() {
      try {
        const [cRes, sRes] = await Promise.all([
          fetch('/api/customers'),
          fetch('/api/skus'),
        ]);
        const cJson = await cRes.json();
        const sJson = await sRes.json();
        if (cRes.ok) setCustomers(cJson.data || []);
        if (sRes.ok) setSkus(sJson.data || []);
      } catch (e) {
        console.error('Failed to load customers/skus for rejection forms');
      }
    }
    loadOptions();
  }, []);

  const fetchRejections = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (filterCustomerId) params.set('customerId', filterCustomerId);

      const res = await fetch(`/api/rejections?${params.toString()}`);
      const json = await res.json();
      if (res.ok) {
        setRejections(json.data || []);
      } else {
        showToast('error', json.error || 'Failed to fetch rejection logs');
      }
    } catch (err: any) {
      showToast('error', 'Network error fetching rejection logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRejections();
  }, [search, filterCustomerId]);

  const handleOpenAdd = () => {
    setFormData({
      customerId: customers.length > 0 ? customers[0].id : '',
      skuId: '',
      productionOrderRef: '',
      rejectionCount: 1,
      rejectionReason: '',
      rejectionDate: new Date().toISOString().split('T')[0],
      notes: '',
    });
    setFormError('');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (item: RejectionItem) => {
    setSelectedRejection(item);
    setFormData({
      customerId: item.customerId,
      skuId: item.skuId || '',
      productionOrderRef: item.productionOrderRef || '',
      rejectionCount: item.rejectionCount,
      rejectionReason: item.rejectionReason,
      rejectionDate: new Date(item.rejectionDate).toISOString().split('T')[0],
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
      const res = await fetch('/api/rejections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.ok) {
        showToast('success', 'Rejection log created successfully');
        setIsAddModalOpen(false);
        fetchRejections();
      } else {
        setFormError(json.error || 'Failed to log rejection');
      }
    } catch (err: any) {
      setFormError('Network error saving rejection record');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRejection) return;
    setFormError('');
    setSubmitting(true);
    try {
      const res = await fetch(`/api/rejections/${selectedRejection.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.ok) {
        showToast('success', 'Rejection record updated successfully');
        setIsEditModalOpen(false);
        fetchRejections();
      } else {
        setFormError(json.error || 'Failed to update rejection record');
      }
    } catch (err: any) {
      setFormError('Network error updating rejection record');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!confirmDialog.rejection) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/rejections/${confirmDialog.rejection.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (res.ok) {
        showToast('success', 'Rejection record deleted');
        setConfirmDialog({ isOpen: false, rejection: null });
        fetchRejections();
      } else {
        showToast('error', json.error || 'Failed to delete record');
      }
    } catch (err: any) {
      showToast('error', 'Network error deleting rejection record');
    } finally {
      setDeleting(false);
    }
  };

  // Filter SKUs based on selected customer in form
  const formFilteredSkus = skus.filter(
    (s) => !formData.customerId || s.customerId === formData.customerId
  );

  const columns = [
    {
      key: 'rejectionDate',
      header: 'Date',
      render: (item: RejectionItem) => formatDate(item.rejectionDate),
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (item: RejectionItem) =>
        item.customer ? (
          <span>
            {item.customer.name} ({item.customer.customerId})
          </span>
        ) : (
          '—'
        ),
    },
    {
      key: 'sku',
      header: 'SKU Code',
      render: (item: RejectionItem) =>
        item.sku ? (
          <span className={styles.codeCell}>{item.sku.skuCode}</span>
        ) : (
          <span className={styles.mutedText}>General</span>
        ),
    },
    {
      key: 'productionOrderRef',
      header: 'PO / Batch Ref',
      render: (item: RejectionItem) =>
        item.productionOrderRef ? (
          <span className={styles.poRef}>{item.productionOrderRef}</span>
        ) : (
          <span className={styles.mutedText}>—</span>
        ),
    },
    {
      key: 'rejectionCount',
      header: 'Qty Rejected',
      render: (item: RejectionItem) => (
        <span className={styles.qtyBadge}>{item.rejectionCount} pcs</span>
      ),
    },
    { key: 'rejectionReason', header: 'Rejection Reason' },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: RejectionItem) => (
        <div className={styles.actionButtons}>
          <Button size="sm" variant="ghost" onClick={() => handleOpenEdit(item)}>
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => setConfirmDialog({ isOpen: true, rejection: item })}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Rejection & Rework Log</h1>
          <p className={styles.subtitle}>
            Track manufacturing quality rejections ({rejections.length} records)
          </p>
        </div>
        <div className="page-header-actions">
          <Button variant="primary" onClick={handleOpenAdd}>
            + Log New Rejection
          </Button>
        </div>
      </div>

      <Card padding="md">
        <div className={styles.toolbar}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search reason, PO ref, notes..."
          />
          <Select
            options={[
              { value: '', label: 'All Customers' },
              ...customers.map((c) => ({
                value: c.id,
                label: `${c.name} (${c.customerId})`,
              })),
            ]}
            value={filterCustomerId}
            onChange={(e) => setFilterCustomerId(e.target.value)}
          />
        </div>

        {loading ? (
          <LoadingSpinner message="Loading rejection records..." />
        ) : rejections.length === 0 ? (
          <EmptyState
            title="No rejections logged"
            description={
              search || filterCustomerId
                ? 'Try adjusting search or filter parameters.'
                : 'Log quality rejections to monitor rework trends.'
            }
            action={
              <Button variant="primary" onClick={handleOpenAdd}>
                Log Rejection
              </Button>
            }
          />
        ) : (
          <Table columns={columns} data={rejections} />
        )}
      </Card>

      {/* Add Rejection Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Log New Rejection"
      >
        <form onSubmit={handleSaveAdd} className={styles.form}>
          {formError && <div className={styles.formError}>{formError}</div>}
          <Select
            label="Customer"
            options={customers.map((c) => ({
              value: c.id,
              label: `${c.name} (${c.customerId})`,
            }))}
            value={formData.customerId}
            onChange={(e) =>
              setFormData({ ...formData, customerId: e.target.value, skuId: '' })
            }
            required
          />
          <Select
            label="SKU (Optional)"
            options={[
              { value: '', label: 'None / General Customer Rejection' },
              ...formFilteredSkus.map((s) => ({
                value: s.id,
                label: `${s.skuCode} — ${s.name}`,
              })),
            ]}
            value={formData.skuId}
            onChange={(e) => setFormData({ ...formData, skuId: e.target.value })}
          />
          <Input
            label="Production Order / Batch Reference (Optional)"
            value={formData.productionOrderRef}
            onChange={(e) =>
              setFormData({ ...formData, productionOrderRef: e.target.value })
            }
            placeholder="e.g. PO-2026-9901 / Batch #4"
          />
          <div className={styles.formRow}>
            <Input
              label="Rejection Count (Pcs)"
              type="number"
              min="1"
              value={formData.rejectionCount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rejectionCount: parseInt(e.target.value) || 1,
                })
              }
              required
            />
            <Input
              label="Rejection Date"
              type="date"
              value={formData.rejectionDate}
              onChange={(e) =>
                setFormData({ ...formData, rejectionDate: e.target.value })
              }
              required
            />
          </div>
          <Input
            label="Rejection Reason"
            value={formData.rejectionReason}
            onChange={(e) => setFormData({ ...formData, rejectionReason: e.target.value })}
            placeholder="e.g. Wax tree porosity breach / Cast inclusion defect"
            required
          />
          <Input
            label="Notes / Inspection Observations"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Optional inspection details"
          />
          <div className={styles.modalActions}>
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={submitting}>
              Save Rejection Log
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Rejection Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Rejection Log"
      >
        <form onSubmit={handleSaveEdit} className={styles.form}>
          {formError && <div className={styles.formError}>{formError}</div>}
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
          <Select
            label="SKU"
            options={[
              { value: '', label: 'None / General Customer Rejection' },
              ...formFilteredSkus.map((s) => ({
                value: s.id,
                label: `${s.skuCode} — ${s.name}`,
              })),
            ]}
            value={formData.skuId}
            onChange={(e) => setFormData({ ...formData, skuId: e.target.value })}
          />
          <Input
            label="Production Order / Batch Reference"
            value={formData.productionOrderRef}
            onChange={(e) =>
              setFormData({ ...formData, productionOrderRef: e.target.value })
            }
          />
          <div className={styles.formRow}>
            <Input
              label="Rejection Count (Pcs)"
              type="number"
              min="1"
              value={formData.rejectionCount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rejectionCount: parseInt(e.target.value) || 1,
                })
              }
              required
            />
            <Input
              label="Rejection Date"
              type="date"
              value={formData.rejectionDate}
              onChange={(e) =>
                setFormData({ ...formData, rejectionDate: e.target.value })
              }
              required
            />
          </div>
          <Input
            label="Rejection Reason"
            value={formData.rejectionReason}
            onChange={(e) => setFormData({ ...formData, rejectionReason: e.target.value })}
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
              Update Rejection Log
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, rejection: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Rejection Record"
        message={`Are you sure you want to delete this rejection record (${confirmDialog.rejection?.rejectionCount} pcs: ${confirmDialog.rejection?.rejectionReason})?`}
        confirmLabel="Delete Record"
        variant="danger"
        isLoading={deleting}
      />
    </>
  );
}
