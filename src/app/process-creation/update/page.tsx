'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
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

export default function ProcessCreationUpdatePage() {
  const { showToast } = useToast();

  // Form states - all loaded completely blank by default
  const [custId, setCustId] = useState('');
  const [selectedSkuType, setSelectedSkuType] = useState<string>('Ring / Pendant / Earing');
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  const [cycleTimes, setCycleTimes] = useState<Record<string, string>>({});
  const [processSearchFilter, setProcessSearchFilter] = useState('');

  // Tracking and status states
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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

  // Computed Total Cycle Time in Hours (Sum of cycle times for selected processes)
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

  // Toggle selection of a process
  function handleToggleProcess(procLabel: string) {
    setSelectedProcesses((prev) => {
      const isSelected = prev.includes(procLabel);
      if (isSelected) {
        const next = prev.filter((p) => p !== procLabel);
        setCycleTimes((ct) => {
          const updated = { ...ct };
          delete updated[procLabel];
          return updated;
        });
        return next;
      } else {
        const allLabels: string[] = PROCESS_LIST.map((p) => p.label);
        const next = [...prev, procLabel].sort(
          (a, b) => allLabels.indexOf(a) - allLabels.indexOf(b)
        );
        return next;
      }
    });
  }

  // Handle Cycle Time change for a process (in Hours)
  function handleCycleTimeChange(procLabel: string, value: string) {
    if (!selectedProcesses.includes(procLabel)) {
      const allLabels: string[] = PROCESS_LIST.map((p) => p.label);
      setSelectedProcesses((prev) =>
        [...prev, procLabel].sort((a, b) => allLabels.indexOf(a) - allLabels.indexOf(b))
      );
    }

    setCycleTimes((prev) => ({
      ...prev,
      [procLabel]: value,
    }));
  }

  function handleSelectAll() {
    const all = PROCESS_LIST.map((p) => p.label);
    setSelectedProcesses(all);
  }

  function handleClearAllProcesses() {
    setSelectedProcesses([]);
    setCycleTimes({});
  }

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

  function validateForm(): boolean {
    const errs: Record<string, string> = {};

    if (!custId.trim()) {
      errs.custId = 'CUST ID is required';
    } else if (!CUST_ID_REGEX.test(custId.trim())) {
      errs.custId = 'CUST ID must follow format: Name(5)-Country(3)-City(4)-Location(4)';
    }

    if (!selectedSkuType) {
      errs.skuType = 'Please select a SKU Type';
    }

    if (selectedProcesses.length === 0) {
      errs.processes = 'Please select at least one manufacturing process from the list';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  // Submit update
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    if (!loadedRecord) {
      if (CUST_ID_REGEX.test(custId) && selectedSkuType) {
        await fetchProcessRecord(custId, selectedSkuType, true);
      } else {
        showToast('error', 'Please enter a valid CUST ID to fetch the configuration first');
      }
      return;
    }

    if (!validateForm()) return;

    try {
      setSubmitting(true);

      const cleanCT: Record<string, number | null> = {};
      selectedProcesses.forEach((proc) => {
        const raw = cycleTimes[proc];
        if (raw !== undefined && raw !== null && raw.trim() !== '') {
          const num = parseFloat(raw.trim());
          cleanCT[proc] = !isNaN(num) && num >= 0 ? num : null;
        } else {
          cleanCT[proc] = null;
        }
      });

      const res = await fetch('/api/process-master', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          custId: custId.trim().toUpperCase(),
          skuType: selectedSkuType,
          processes: selectedProcesses,
          cycleTimes: cleanCT,
          totalCycleTime,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        if (json.fieldErrors) {
          setErrors(json.fieldErrors);
        }
        showToast('error', json.error || 'Failed to update Process Master File');
        return;
      }

      // Successful update - Auto-clear all fields immediately
      clearAllFields();
      showToast('success', 'Process Master File updated successfully');
    } catch (err) {
      console.error('Update error:', err);
      showToast('error', 'Network error while saving updates');
    } finally {
      setSubmitting(false);
    }
  }

  const filteredProcesses = useMemo(() => {
    if (!processSearchFilter.trim()) return PROCESS_LIST;
    const q = processSearchFilter.trim().toLowerCase();
    return PROCESS_LIST.filter(
      (p) => p.label.toLowerCase().includes(q) || p.name.toLowerCase().includes(q)
    );
  }, [processSearchFilter]);

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
        <span className={styles.currentCrumb}>Update</span>
      </div>

      <div className="page-header">
        <div>
          <h1>Process Creation - Update Record</h1>
          <p className={styles.subtitle}>
            Enter CUST ID to fetch and update existing Process Master configurations with cycle times in hours.
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
        <form onSubmit={handleUpdate} className={styles.form}>
          <div className={styles.formSectionHeader}>
            <div>
              <h2>1. Customer Account & SKU Type</h2>
              <span className={styles.formHelpText}>
                Enter CUST ID (5-3-4-4 format). Auto-fetches record as soon as you finish typing.
              </span>
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
              <div className={styles.selectionControls}>
                <input
                  type="text"
                  placeholder="Filter processes..."
                  value={processSearchFilter}
                  onChange={(e) => setProcessSearchFilter(e.target.value)}
                  className={styles.processSearchInput}
                />
                <Button type="button" variant="secondary" size="sm" onClick={handleSelectAll}>
                  Select All
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={handleClearAllProcesses}>
                  Clear
                </Button>
              </div>
            </div>

            {errors.processes && (
              <div className={styles.errorBanner}>{errors.processes}</div>
            )}

            <div className={styles.processGrid}>
              {filteredProcesses.map((proc) => {
                const isSelected = selectedProcesses.includes(proc.label);
                return (
                  <div
                    key={proc.code}
                    className={`${styles.processItem} ${
                      isSelected ? styles.processItemSelected : ''
                    }`}
                  >
                    <div
                      className={styles.processLeft}
                      onClick={() => handleToggleProcess(proc.label)}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className={styles.checkbox}
                      />
                      <span className={styles.processLabel}>{proc.label}</span>
                    </div>

                    <div className={styles.cycleTimeInputGroup}>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        disabled={!isSelected}
                        value={cycleTimes[proc.label] ?? ''}
                        onChange={(e) => handleCycleTimeChange(proc.label, e.target.value)}
                        className={styles.cycleTimeInput}
                      />
                      <span className={styles.hoursUnit}>Hours</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Actions - Single Update Action with Auto-Clear on Success */}
          <div className={styles.formActions}>
            <Button type="submit" variant="primary" disabled={submitting || fetching}>
              {submitting ? 'Saving Changes...' : 'Update Configuration'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
