'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/components/ui/Toast';
import styles from './skuDetail.module.css';

interface ProcessOption {
  id: string;
  processCode: string;
  processName: string;
  department: string | null;
}

interface SkuDetail {
  id: string;
  skuCode: string;
  name: string;
  category: string | null;
  description: string | null;
  isActive: boolean;
  customer: {
    id: string;
    name: string;
    customerId: string;
  };
  processes: Array<{
    id: string;
    sequence: number;
    process: ProcessOption;
  }>;
}

export default function SkuDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: skuId } = use(params);
  const { showToast } = useToast();

  const [sku, setSku] = useState<SkuDetail | null>(null);
  const [allProcesses, setAllProcesses] = useState<ProcessOption[]>([]);
  const [assignedProcesses, setAssignedProcesses] = useState<ProcessOption[]>([]);
  const [selectedAddProcessId, setSelectedAddProcessId] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Load SKU and all master processes
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [skuRes, procRes] = await Promise.all([
          fetch(`/api/skus/${skuId}`),
          fetch('/api/processes?includeInactive=false'),
        ]);

        const skuJson = await skuRes.json();
        const procJson = await procRes.json();

        if (skuRes.ok && procRes.ok) {
          const skuData: SkuDetail = skuJson.data;
          setSku(skuData);

          // Extract existing assigned process list ordered by sequence
          const currentList = (skuData.processes || [])
            .sort((a, b) => a.sequence - b.sequence)
            .map((p) => p.process);

          setAssignedProcesses(currentList);
          setAllProcesses(procJson.data || []);
        } else {
          showToast('error', skuJson.error || 'Failed to load SKU details');
        }
      } catch (err) {
        showToast('error', 'Network error loading SKU routing data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [skuId]);

  // Processes available to add (excludes already assigned ones to prevent duplicates)
  const availableProcesses = allProcesses.filter(
    (p) => !assignedProcesses.some((ap) => ap.id === p.id)
  );

  // Set default selection when available processes change
  useEffect(() => {
    if (availableProcesses.length > 0) {
      setSelectedAddProcessId(availableProcesses[0].id);
    } else {
      setSelectedAddProcessId('');
    }
  }, [assignedProcesses, allProcesses]);

  // Add process to routing sequence
  const handleAddProcess = () => {
    if (!selectedAddProcessId) return;
    const processToAdd = allProcesses.find((p) => p.id === selectedAddProcessId);
    if (!processToAdd) return;

    // Double check duplicate prevention
    if (assignedProcesses.some((p) => p.id === processToAdd.id)) {
      showToast('warning', `Process '${processToAdd.processCode}' is already in this routing.`);
      return;
    }

    setAssignedProcesses((prev) => [...prev, processToAdd]);
    setIsDirty(true);
    showToast('info', `Added '${processToAdd.processCode}' to routing sequence.`);
  };

  // Remove process from routing sequence
  const handleRemoveProcess = (index: number) => {
    const removed = assignedProcesses[index];
    setAssignedProcesses((prev) => prev.filter((_, i) => i !== index));
    setIsDirty(true);
    showToast('info', `Removed '${removed.processCode}' from routing.`);
  };

  // Move process up in sequence
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newList = [...assignedProcesses];
    const temp = newList[index - 1];
    newList[index - 1] = newList[index];
    newList[index] = temp;
    setAssignedProcesses(newList);
    setIsDirty(true);
  };

  // Move process down in sequence
  const handleMoveDown = (index: number) => {
    if (index === assignedProcesses.length - 1) return;
    const newList = [...assignedProcesses];
    const temp = newList[index + 1];
    newList[index + 1] = newList[index];
    newList[index] = temp;
    setAssignedProcesses(newList);
    setIsDirty(true);
  };

  // Save process routing sequence to backend
  const handleSaveRouting = async () => {
    try {
      setSaving(true);
      const processIds = assignedProcesses.map((p) => p.id);

      const res = await fetch(`/api/skus/${skuId}/processes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ processIds }),
      });

      const json = await res.json();
      if (res.ok) {
        showToast('success', `SKU Process Routing saved successfully! (${assignedProcesses.length} processes)`);
        setIsDirty(false);
      } else {
        showToast('error', json.error || 'Failed to save process routing');
      }
    } catch (err) {
      showToast('error', 'Network error saving process routing');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading SKU process routing mapper..." />;
  }

  if (!sku) {
    return (
      <EmptyState
        title="SKU Not Found"
        description="The requested SKU item could not be loaded."
        action={
          <Link href="/skus">
            <Button variant="primary">Back to SKUs</Button>
          </Link>
        }
      />
    );
  }

  return (
    <>
      <div className={styles.breadcrumbNav}>
        <Link href="/skus">← Back to SKU Master</Link>
      </div>

      <div className="page-header">
        <div>
          <div className={styles.titleRow}>
            <h1>{sku.skuCode}</h1>
            <Badge variant={sku.isActive ? 'success' : 'default'}>
              {sku.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <p className={styles.subtitle}>{sku.name}</p>
        </div>
        <div className="page-header-actions">
          <Button
            variant="primary"
            onClick={handleSaveRouting}
            isLoading={saving}
            disabled={!isDirty}
          >
            {isDirty ? '💾 Save Process Routing' : 'Routing Saved'}
          </Button>
        </div>
      </div>

      <div className={styles.container}>
        {/* SKU Info Card */}
        <Card padding="md">
          <h3>SKU Specifications</h3>
          <div className={styles.infoGrid}>
            <div>
              <span className={styles.infoLabel}>Customer</span>
              <span className={styles.infoValue}>
                {sku.customer.name} ({sku.customer.customerId})
              </span>
            </div>
            <div>
              <span className={styles.infoLabel}>Category / Type</span>
              <span className={styles.infoValue}>{sku.category || 'Standard'}</span>
            </div>
            <div>
              <span className={styles.infoLabel}>Description</span>
              <span className={styles.infoValue}>{sku.description || 'No description'}</span>
            </div>
          </div>
        </Card>

        {/* Process Routing Mapper Tool */}
        <Card padding="md">
          <div className={styles.mapperHeader}>
            <div>
              <h3>SKU Process Sequence Routing</h3>
              <p className={styles.mapperSubtitle}>
                Define the ordered sequence of work centres this SKU moves through.
              </p>
            </div>
            {isDirty && <span className={styles.unsavedBadge}>Unsaved changes</span>}
          </div>

          {/* Add Process Control Bar */}
          <div className={styles.addControlBar}>
            <Select
              label="Select Work Centre to Add"
              options={availableProcesses.map((p) => ({
                value: p.id,
                label: `${p.processCode} — ${p.processName} (${p.department || 'General'})`,
              }))}
              value={selectedAddProcessId}
              onChange={(e) => setSelectedAddProcessId(e.target.value)}
              disabled={availableProcesses.length === 0}
            />
            <Button
              variant="primary"
              onClick={handleAddProcess}
              disabled={availableProcesses.length === 0 || !selectedAddProcessId}
            >
              + Add to Sequence
            </Button>
          </div>

          {/* Ordered Sequence List */}
          {assignedProcesses.length === 0 ? (
            <EmptyState
              title="No Process Routing Defined"
              description="This SKU currently has no manufacturing work centres assigned. Use the dropdown above to add processes."
            />
          ) : (
            <div className={styles.sequenceList}>
              {assignedProcesses.map((proc, index) => (
                <div key={`${proc.id}-${index}`} className={styles.sequenceRow}>
                  <div className={styles.stepBadge}>{index + 1}</div>
                  <div className={styles.procInfo}>
                    <span className={styles.procCode}>{proc.processCode}</span>
                    <span className={styles.procName}>{proc.processName}</span>
                    {proc.department && (
                      <span className={styles.deptBadge}>{proc.department}</span>
                    )}
                  </div>
                  <div className={styles.reorderActions}>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      title="Move Up"
                    >
                      ▲
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === assignedProcesses.length - 1}
                      title="Move Down"
                    >
                      ▼
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleRemoveProcess(index)}
                      title="Remove from routing"
                    >
                      ✕ Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
