'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useToast } from '@/components/ui/Toast';
import {
  PROCESS_LIST,
  PROCESS_SKU_TYPE_OPTIONS,
  CUST_ID_REGEX,
  formatCustIdInput,
} from '@/lib/validators';
import styles from '../process-creation.module.css';

interface ProcessMasterRecord {
  id: string;
  custId: string;
  skuType: string;
  processes: string[];
  cycleTimes: Record<string, number | null>;
  totalCycleTime: number;
  createdAt: string;
  updatedAt: string;
}

export default function ProcessCreationDeletePage() {
  const { showToast } = useToast();

  // Form states - all loaded completely blank by default
  const [custId, setCustId] = useState('');
  const [selectedSkuType, setSelectedSkuType] = useState<string>('Ring / Pendant / Earing');
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  const [cycleTimes, setCycleTimes] = useState<Record<string, string>>({});

  // Tracking, fetching, and deletion states
  const [fetching, setFetching] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [loadedRecord, setLoadedRecord] = useState<ProcessMasterRecord | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const lastFetchedIdRef = useRef<string>('');

  // Fetch record when CUST ID and SKU Type are entered
  const fetchProcessRecord = useCallback(
    async (queryCustId: string, skuType: string, isManual = false) => {
      if (!queryCustId || !skuType) return;

      try {
        setFetching(true);
        const res = await fetch(
          `/api/process-master?custId=${encodeURIComponent(queryCustId)}&skuType=${encodeURIComponent(skuType)}`
        );
        const json = await res.json();

        if (!res.ok || !json.data || json.data.length === 0) {
          setLoadedRecord(null);
          setSelectedProcesses([]);
          setCycleTimes({});
          setErrors({
            custId: `No configuration found for CUST ID "${queryCustId}" (${skuType})`,
          });
          if (isManual) {
            showToast('info', `No existing configuration found for ${queryCustId} (${skuType})`);
          }
          return;
        }

        const record: ProcessMasterRecord = json.data[0];
        setLoadedRecord(record);
        setSelectedProcesses(record.processes || []);

        const mappedCT: Record<string, string> = {};
        if (record.cycleTimes) {
          Object.entries(record.cycleTimes).forEach(([proc, val]) => {
            if (val !== null && val !== undefined) {
              mappedCT[proc] = String(val);
            }
          });
        }
        setCycleTimes(mappedCT);
        setErrors({});
        lastFetchedIdRef.current = `${queryCustId}_${skuType}`;
        showToast('info', `Loaded configuration for ${record.custId} (${record.skuType})`);
      } catch (err) {
        console.error('Fetch error:', err);
        if (isManual) {
          showToast('error', 'Network error while fetching record');
        }
      } finally {
        setFetching(false);
      }
    },
    [showToast]
  );

  // Handle typing with auto-hyphenation formatting (5-3-4-4)
  function handleCustIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatCustIdInput(e.target.value);
    setCustId(formatted);

    // If edited/incomplete, clear loaded record
    if (formatted.length < 19) {
      setLoadedRecord(null);
    }
  }

  // Trigger auto-fetch as soon as the last letter of CUST ID is typed
  useEffect(() => {
    const fetchKey = `${custId}_${selectedSkuType}`;
    if (CUST_ID_REGEX.test(custId) && fetchKey !== lastFetchedIdRef.current) {
      fetchProcessRecord(custId, selectedSkuType, false);
    }
  }, [custId, selectedSkuType, fetchProcessRecord]);

  // Computed Total Cycle Time in Hours
  const totalCycleTime = useMemo(() => {
    let sum = 0;
    selectedProcesses.forEach((procLabel) => {
      const val = parseFloat(cycleTimes[procLabel] || '0');
      if (!isNaN(val) && val > 0) {
        sum += val;
      }
    });
    return Math.round(sum * 100) / 100;
  }, [selectedProcesses, cycleTimes]);

  // Auto-clear all fields
  function clearAllFields() {
    setCustId('');
    setSelectedSkuType('Ring / Pendant / Earing');
    setSelectedProcesses([]);
    setCycleTimes({});
    setLoadedRecord(null);
    setErrors({});
    lastFetchedIdRef.current = '';
  }

  // Click Delete button -> trigger confirmation dialog
  function handleDeleteClick(e: React.FormEvent) {
    e.preventDefault();

    if (!loadedRecord) {
      if (CUST_ID_REGEX.test(custId) && selectedSkuType) {
        fetchProcessRecord(custId, selectedSkuType, true);
      } else {
        showToast('error', 'Please enter a valid CUST ID to find the configuration first');
      }
      return;
    }

    setIsConfirmOpen(true);
  }

  // Confirmed delete execution
  async function handleConfirmDelete() {
    if (!loadedRecord) return;

    try {
      setDeleting(true);
      const res = await fetch(`/api/process-master/${encodeURIComponent(loadedRecord.id)}`, {
        method: 'DELETE',
      });
      const json = await res.json();

      if (!res.ok) {
        showToast('error', json.error || 'Failed to delete Process Master File');
        return;
      }

      // Close modal and auto-clear all fields
      setIsConfirmOpen(false);
      clearAllFields();
      showToast('success', 'Process Master File deleted successfully');
    } catch (err) {
      console.error('Delete error:', err);
      showToast('error', 'Network error while deleting record');
    } finally {
      setDeleting(false);
    }
  }

  const skuTypeDropdownOptions = useMemo(() => {
    return PROCESS_SKU_TYPE_OPTIONS.map((opt) => ({
      value: opt,
      label: opt,
    }));
  }, []);

  return (
    <div className={styles.container}>
      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumbNav}>
        <Link href="/" className={styles.homeCrumb}>Home</Link>
        <span className={styles.separator}>/</span>
        <Link href="/main" className={styles.navLink}>Main Screen</Link>
        <span className={styles.separator}>/</span>
        <Link href="/process-creation" className={styles.navLink}>Process Creation</Link>
        <span className={styles.separator}>/</span>
        <span className={styles.currentCrumb}>Delete</span>
      </div>

      <div className="page-header">
        <div>
          <h1>Process Creation - Delete Record</h1>
          <p className={styles.subtitle}>
            Enter CUST ID to fetch and review Process Master configuration with cycle times in hours before deletion.
          </p>
        </div>
        <div className="page-header-actions">
          <Link href="/process-creation">
            <Button variant="secondary">Back to Process Creation</Button>
          </Link>
          <Link href="/main">
            <Button variant="ghost">Main Screen</Button>
          </Link>
        </div>
      </div>

      {/* Main Process Master Form Card */}
      <Card padding="lg" className={styles.formCard}>
        <form onSubmit={handleDeleteClick} className={styles.form}>
          <div className={styles.formSectionHeader}>
            <div>
              <h2>1. Customer Account & SKU Type</h2>
              <p className={styles.formHelpText}>
                Enter CUST ID (5-3-4-4 format). Auto-fetches record as soon as you finish typing.
              </p>
            </div>
            {loadedRecord && (
              <span className={styles.selectionBadge}>
                Loaded: {loadedRecord.custId} ({loadedRecord.skuType})
              </span>
            )}
          </div>

          <div className={styles.formGrid}>
            {/* 1. CUST ID Input with Auto-Formatting */}
            <div className={styles.formGroup}>
              <label htmlFor="cust-id-input" className={styles.label}>
                CUST ID <span className={styles.required}>*</span>
                {fetching && <span className={styles.fetchingText}>Fetching...</span>}
              </label>
              <input
                id="cust-id-input"
                type="text"
                maxLength={19}
                value={custId}
                onChange={handleCustIdChange}
                className={`${styles.custIdInput} ${errors.custId ? styles.inputError : ''}`}
              />
              {errors.custId && <span className={styles.errorBanner}>{errors.custId}</span>}
              <span className={styles.fieldNote}>
                Format: Name(5) - Country(3) - City(4) - Location(4)
              </span>
            </div>

            {/* 2. SKU Type Selection */}
            <div className={styles.formGroup}>
              <label htmlFor="sku-type-select" className={styles.label}>
                SKU Type <span className={styles.required}>*</span>
              </label>
              <Select
                id="sku-type-select"
                value={selectedSkuType}
                onChange={(e) => setSelectedSkuType(e.target.value)}
                options={skuTypeDropdownOptions}
                error={errors.skuType}
              />
              <span className={styles.fieldNote}>
                Select the product category for this process routing.
              </span>
            </div>
          </div>

          {/* 2. Manufacturing Processes & Cycle Times (Hours) - Single Unified Section */}
          <div className={styles.processesSection}>
            <div className={styles.processesHeader}>
              <div className={styles.processesTitleGroup}>
                <h3 className={styles.processesTitle}>2. Manufacturing Processes & Cycle Times (Hours)</h3>
                <span className={styles.selectionBadge}>
                  {selectedProcesses.length} of {PROCESS_LIST.length} selected
                </span>
                <div className={styles.totalCycleTimeCard}>
                  <span className={styles.totalCycleLabel}>Total Cycle Time:</span>
                  <span className={styles.totalCycleValue}>{totalCycleTime} Hours</span>
                </div>
              </div>
            </div>

            <div className={styles.processGrid}>
              {PROCESS_LIST.map((proc) => {
                const isSelected = selectedProcesses.includes(proc.label);
                return (
                  <div
                    key={proc.code}
                    className={`${styles.processItem} ${
                      isSelected ? styles.processItemSelected : ''
                    }`}
                    style={{ opacity: isSelected ? 1 : 0.6 }}
                  >
                    <div className={styles.processLeft} style={{ cursor: 'default' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        disabled
                        className={styles.checkbox}
                      />
                      <span className={styles.processLabel}>{proc.label}</span>
                    </div>

                    <div className={styles.cycleTimeInputGroup}>
                      <input
                        type="number"
                        value={cycleTimes[proc.label] ?? ''}
                        readOnly
                        disabled
                        className={styles.cycleTimeInput}
                      />
                      <span className={styles.hoursUnit}>Hours</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Actions - Red Delete Record Button */}
          <div className={styles.formActions}>
            <Button
              type="submit"
              variant="danger"
              disabled={deleting || fetching || !loadedRecord}
            >
              Delete Configuration
            </Button>
          </div>
        </form>
      </Card>

      {/* Confirm Deletion Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Process Configuration Deletion"
        message={`Are you sure you want to permanently delete the Process Master configuration for CUST ID "${loadedRecord?.custId}" (${loadedRecord?.skuType})? This action cannot be undone.`}
        confirmLabel={deleting ? 'Deleting...' : 'Confirm Delete'}
        cancelLabel="Cancel"
        variant="danger"
        isLoading={deleting}
      />
    </div>
  );
}
