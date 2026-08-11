'use client';

import { useState, useEffect } from 'react';
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
import styles from './processes.module.css';

interface ProcessItem {
  id: string;
  processCode: string;
  processName: string;
  department: string | null;
  defaultSequence: number;
  description: string | null;
  isActive: boolean;
}

export default function ProcessesPage() {
  const { showToast } = useToast();
  const [processes, setProcesses] = useState<ProcessItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [includeInactive, setIncludeInactive] = useState(true);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<ProcessItem | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    processCode: '',
    processName: '',
    department: '',
    defaultSequence: 0,
    description: '',
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    process: ProcessItem | null;
  }>({ isOpen: false, process: null });
  const [toggling, setToggling] = useState(false);

  const fetchProcesses = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (includeInactive) params.set('includeInactive', 'true');

      const res = await fetch(`/api/processes?${params.toString()}`);
      const json = await res.json();
      if (res.ok) {
        setProcesses(json.data || []);
      } else {
        showToast('error', json.error || 'Failed to fetch processes');
      }
    } catch (err: any) {
      showToast('error', 'Network error fetching processes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProcesses();
  }, [search, includeInactive]);

  const handleOpenAdd = () => {
    setFormData({
      processCode: '',
      processName: '',
      department: '',
      defaultSequence: (processes.length + 1) * 1,
      description: '',
    });
    setFormError('');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (item: ProcessItem) => {
    setSelectedProcess(item);
    setFormData({
      processCode: item.processCode,
      processName: item.processName,
      department: item.department || '',
      defaultSequence: item.defaultSequence,
      description: item.description || '',
    });
    setFormError('');
    setIsEditModalOpen(true);
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/processes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.ok) {
        showToast('success', `Process '${json.data.processCode}' created successfully`);
        setIsAddModalOpen(false);
        fetchProcesses();
      } else {
        setFormError(json.error || 'Failed to create process');
      }
    } catch (err: any) {
      setFormError('Network error saving process');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProcess) return;
    setFormError('');
    setSubmitting(true);
    try {
      const res = await fetch(`/api/processes/${selectedProcess.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.ok) {
        showToast('success', `Process '${json.data.processCode}' updated successfully`);
        setIsEditModalOpen(false);
        fetchProcesses();
      } else {
        setFormError(json.error || 'Failed to update process');
      }
    } catch (err: any) {
      setFormError('Network error updating process');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmToggleActive = async () => {
    if (!confirmDialog.process) return;
    setToggling(true);
    try {
      const res = await fetch(`/api/processes/${confirmDialog.process.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (res.ok) {
        showToast('success', json.message || 'Status updated');
        setConfirmDialog({ isOpen: false, process: null });
        fetchProcesses();
      } else {
        showToast('error', json.error || 'Failed to update status');
      }
    } catch (err: any) {
      showToast('error', 'Network error updating process status');
    } finally {
      setToggling(false);
    }
  };

  const columns = [
    {
      key: 'processCode',
      header: 'Process Code',
      render: (item: ProcessItem) => (
        <span className={styles.codeCell}>{item.processCode}</span>
      ),
    },
    { key: 'processName', header: 'Process Name' },
    {
      key: 'department',
      header: 'Department',
      render: (item: ProcessItem) =>
        item.department ? (
          <span className={styles.deptTag}>{item.department}</span>
        ) : (
          <span className={styles.mutedText}>—</span>
        ),
    },
    { key: 'defaultSequence', header: 'Default Seq' },
    {
      key: 'isActive',
      header: 'Status',
      render: (item: ProcessItem) => (
        <Badge variant={item.isActive ? 'success' : 'default'}>
          {item.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: ProcessItem) => (
        <div className={styles.actionButtons}>
          <Button size="sm" variant="ghost" onClick={() => handleOpenEdit(item)}>
            Edit
          </Button>
          <Button
            size="sm"
            variant={item.isActive ? 'danger' : 'secondary'}
            onClick={() => setConfirmDialog({ isOpen: true, process: item })}
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
          <h1>Work Centres / Processes</h1>
          <p className={styles.subtitle}>
            KAMA manufacturing process master table ({processes.length} records)
          </p>
        </div>
        <div className="page-header-actions">
          <Button variant="primary" onClick={handleOpenAdd}>
            + Add New Process
          </Button>
        </div>
      </div>

      <Card padding="md">
        <div className={styles.toolbar}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search code, name, department..."
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
          <LoadingSpinner message="Loading work centres..." />
        ) : processes.length === 0 ? (
          <EmptyState
            title="No work centres found"
            description={
              search ? 'Try adjusting your search query' : 'No processes available in database.'
            }
            action={
              <Button variant="primary" onClick={handleOpenAdd}>
                Add Process
              </Button>
            }
          />
        ) : (
          <Table columns={columns} data={processes} />
        )}
      </Card>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Process"
      >
        <form onSubmit={handleSaveAdd} className={styles.form}>
          {formError && <div className={styles.formError}>{formError}</div>}
          <Input
            label="Process Code (e.g. WAXINJET, CASTING)"
            value={formData.processCode}
            onChange={(e) => setFormData({ ...formData, processCode: e.target.value })}
            placeholder="e.g. WAXINJET"
            required
          />
          <Input
            label="Process Name"
            value={formData.processName}
            onChange={(e) => setFormData({ ...formData, processName: e.target.value })}
            placeholder="e.g. Wax Injection"
            required
          />
          <Input
            label="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            placeholder="e.g. Wax, Casting, Finishing"
          />
          <Input
            label="Default Sequence Number"
            type="number"
            value={formData.defaultSequence}
            onChange={(e) =>
              setFormData({ ...formData, defaultSequence: parseInt(e.target.value) || 0 })
            }
          />
          <div className={styles.modalActions}>
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={submitting}>
              Save Process
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit Process: ${selectedProcess?.processCode || ''}`}
      >
        <form onSubmit={handleSaveEdit} className={styles.form}>
          {formError && <div className={styles.formError}>{formError}</div>}
          <Input
            label="Process Code"
            value={formData.processCode}
            onChange={(e) => setFormData({ ...formData, processCode: e.target.value })}
            required
          />
          <Input
            label="Process Name"
            value={formData.processName}
            onChange={(e) => setFormData({ ...formData, processName: e.target.value })}
            required
          />
          <Input
            label="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          />
          <Input
            label="Default Sequence Number"
            type="number"
            value={formData.defaultSequence}
            onChange={(e) =>
              setFormData({ ...formData, defaultSequence: parseInt(e.target.value) || 0 })
            }
          />
          <div className={styles.modalActions}>
            <Button type="button" variant="secondary" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={submitting}>
              Update Process
            </Button>
          </div>
        </form>
      </Modal>

      {/* Deactivate/Activate Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, process: null })}
        onConfirm={handleConfirmToggleActive}
        title={`${confirmDialog.process?.isActive ? 'Deactivate' : 'Activate'} Process`}
        message={`Are you sure you want to ${
          confirmDialog.process?.isActive ? 'deactivate' : 'activate'
        } process '${confirmDialog.process?.processCode}'?`}
        confirmLabel={confirmDialog.process?.isActive ? 'Deactivate' : 'Activate'}
        variant={confirmDialog.process?.isActive ? 'danger' : 'warning'}
        isLoading={toggling}
      />
    </>
  );
}
