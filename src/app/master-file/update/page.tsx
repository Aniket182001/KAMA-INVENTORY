'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import styles from './update.module.css';

const SKU_NAME_1_FIXED = 'Necklace/ Bracelate';
const SKU_NAME_2_FIXED = 'Ring/ Pendent/ Earing';

interface MasterFileRecord {
  id: string;
  custId: string;
  custName: string;
  skuId: string;
  skuName?: string | null;
  skuType1?: string | null;
  deliveryTime1Days?: number | null;
  skuType2?: string | null;
  deliveryTime2Days?: number | null;
  deliveryTimeDays?: number | null;
  createdAt: string;
  updatedAt: string;
}

export default function MasterFileUpdatePage() {
  const { showToast } = useToast();

  // Form states
  const [id, setId] = useState('');
  const [custName, setCustName] = useState('');
  const [skuId, setSkuId] = useState('');

  // Delivery Time inputs for separate SKU Name fields
  const [deliveryTime1Days, setDeliveryTime1Days] = useState('');
  const [deliveryTime2Days, setDeliveryTime2Days] = useState('');

  // Structured CUST ID parts: Name(5) - Country(3) - City(4) - Location(4)
  const [custNamePart, setCustNamePart] = useState('');
  const [custCountryPart, setCustCountryPart] = useState('');
  const [custCityPart, setCustCityPart] = useState('');
  const [custLocPart, setCustLocPart] = useState('');

  // Tracking and status states
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadedRecord, setLoadedRecord] = useState<MasterFileRecord | null>(null);

  // Compute composite CUST ID
  const composedCustId = `${custNamePart.trim().toUpperCase()}-${custCountryPart.trim().toUpperCase()}-${custCityPart.trim().toUpperCase()}-${custLocPart.trim().toUpperCase()}`;
  const isCustIdComplete =
    custNamePart.trim().length === 5 &&
    custCountryPart.trim().length === 3 &&
    custCityPart.trim().length === 4 &&
    custLocPart.trim().length === 4;

  const lastFetchedIdRef = useRef<string>('');

  // Auto-clear helper function to reset all fields back to blank
  function clearAllFields() {
    setId('');
    setCustNamePart('');
    setCustCountryPart('');
    setCustCityPart('');
    setCustLocPart('');
    setCustName('');
    setSkuId('');
    setDeliveryTime1Days('');
    setDeliveryTime2Days('');
    setLoadedRecord(null);
    setErrors({});
    lastFetchedIdRef.current = '';
  }

  // Fetch existing record by CUST ID
  const fetchRecordByCustId = useCallback(
    async (queryCustId: string, isManual = false) => {
      if (!queryCustId) return;

      try {
        setFetching(true);
        const res = await fetch(`/api/master-file/customers?custId=${encodeURIComponent(queryCustId)}`);
        const json = await res.json();

        if (!res.ok || !json.data) {
          setLoadedRecord(null);
          setId('');
          setCustName('');
          setSkuId('');
          setDeliveryTime1Days('');
          setDeliveryTime2Days('');
          setErrors({ custId: `Record not found for CUST ID "${queryCustId}"` });
          if (isManual) {
            showToast('error', `Record not found for CUST ID "${queryCustId}"`);
          }
          return;
        }

        const record: MasterFileRecord = json.data;
        setLoadedRecord(record);
        setId(record.id);
        setCustName(record.custName);
        setSkuId(record.skuId);

        // Resolve Delivery Time 1 (Necklace/ Bracelate)
        let d1Val = '';
        if (record.skuType1 === SKU_NAME_1_FIXED && record.deliveryTime1Days) {
          d1Val = String(record.deliveryTime1Days);
        } else if (record.skuName === SKU_NAME_1_FIXED && record.deliveryTimeDays) {
          d1Val = String(record.deliveryTimeDays);
        } else if (record.deliveryTime1Days) {
          d1Val = String(record.deliveryTime1Days);
        }

        // Resolve Delivery Time 2 (Ring/ Pendent/ Earing)
        let d2Val = '';
        if (record.skuType2 === SKU_NAME_2_FIXED && record.deliveryTime2Days) {
          d2Val = String(record.deliveryTime2Days);
        } else if (record.skuName === SKU_NAME_2_FIXED && record.deliveryTimeDays) {
          d2Val = String(record.deliveryTimeDays);
        } else if (record.deliveryTime2Days) {
          d2Val = String(record.deliveryTime2Days);
        }

        setDeliveryTime1Days(d1Val);
        setDeliveryTime2Days(d2Val);

        setErrors({});
        lastFetchedIdRef.current = queryCustId;
        showToast('info', `Record found for ${record.custId}`);
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

  // Auto-fetch when CUST ID format (5-3-4-4) is fully entered
  useEffect(() => {
    if (isCustIdComplete && composedCustId !== lastFetchedIdRef.current) {
      fetchRecordByCustId(composedCustId, false);
    }
  }, [isCustIdComplete, composedCustId, fetchRecordByCustId]);

  function validateForm(): boolean {
    const errs: Record<string, string> = {};

    if (!id.trim()) {
      errs.id = 'ID is missing. Enter a valid CUST ID above to load an existing record.';
    }

    if (!isCustIdComplete) {
      errs.custId = 'Complete CUST ID is required (5-3-4-4 characters)';
    }

    if (!custName.trim()) {
      errs.custName = 'Customer Name is required';
    }

    if (!skuId.trim()) {
      errs.skuId = 'SKU ID is required';
    }

    const hasD1 = Boolean(deliveryTime1Days.trim());
    const hasD2 = Boolean(deliveryTime2Days.trim());

    if (!hasD1 && !hasD2) {
      errs.deliveryTime1Days = 'Enter Delivery Time for at least one SKU Name';
    }

    if (hasD1) {
      const d1 = parseInt(deliveryTime1Days, 10);
      if (isNaN(d1) || d1 < 1) {
        errs.deliveryTime1Days = 'Must be a valid positive number of days';
      }
    }

    if (hasD2) {
      const d2 = parseInt(deliveryTime2Days, 10);
      if (isNaN(d2) || d2 < 1) {
        errs.deliveryTime2Days = 'Must be a valid positive number of days';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    if (!loadedRecord && !id.trim()) {
      if (isCustIdComplete) {
        await fetchRecordByCustId(composedCustId, true);
      } else {
        showToast('error', 'Please enter a valid CUST ID to find the record first');
      }
      return;
    }

    if (!validateForm()) return;

    try {
      setSubmitting(true);
      const recordIdToUpdate = loadedRecord?.id || id.trim();

      const res = await fetch(`/api/master-file/customers/${encodeURIComponent(recordIdToUpdate)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          custName: custName.trim(),
          skuId: skuId.trim(),
          deliveryTime1Days: deliveryTime1Days.trim() ? parseInt(deliveryTime1Days, 10) : undefined,
          deliveryTime2Days: deliveryTime2Days.trim() ? parseInt(deliveryTime2Days, 10) : undefined,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        if (json.fieldErrors) {
          setErrors(json.fieldErrors);
        }
        showToast('error', json.error || 'Failed to update record');
        return;
      }

      // Successful update - Auto-clear all fields immediately
      clearAllFields();
      showToast('success', 'Master File record updated successfully');
    } catch (err) {
      console.error('Update error:', err);
      showToast('error', 'Network error while saving updates');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.container}>
      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumbNav}>
        <Link href="/" className={styles.homeCrumb}>Home</Link>
        <span className={styles.separator}>/</span>
        <Link href="/main" className={styles.navLink}>Main Screen</Link>
        <span className={styles.separator}>/</span>
        <Link href="/master-file" className={styles.navLink}>Master File Creation</Link>
        <span className={styles.separator}>/</span>
        <span className={styles.currentCrumb}>Update</span>
      </div>

      <div className="page-header">
        <div>
          <h1>Master File Creation - Update Record</h1>
          <p className={styles.subtitle}>
            Enter CUST ID to fetch and update existing Master File record details.
          </p>
        </div>
        <div className="page-header-actions">
          <Link href="/master-file">
            <Button variant="secondary">Back to Master File Creation</Button>
          </Link>
          <Link href="/main">
            <Button variant="ghost">Main Screen</Button>
          </Link>
        </div>
      </div>

      {/* Form Card - Identical UI layout to Add Record */}
      <Card padding="lg" className={styles.formCard}>
        <form onSubmit={handleUpdate} className={styles.form}>
          <div className={styles.formSectionHeader}>
            <div>
              <h2>Record Details</h2>
              <p className={styles.formHelpText}>
                Enter CUST ID to automatically load the existing record into the fields below.
              </p>
            </div>
            {loadedRecord && (
              <span className={styles.loadedBadge}>
                Loaded: {loadedRecord.custId}
              </span>
            )}
          </div>

          <div className={styles.formGrid}>
            {/* 1. ID (Read-only / populated on fetch) */}
            <div className={styles.formGroup}>
              <label htmlFor="record-id" className={styles.label}>
                ID <span className={styles.lockedNote}>(Locked)</span>
              </label>
              <Input
                id="record-id"
                value={id}
                readOnly
                disabled
                className={styles.lockedInput}
              />
              <span className={styles.fieldNote}>Auto-populated from existing record.</span>
            </div>

            {/* 2. CUST ID (Structured: 5-3-4-4) */}
            <div className={styles.formGroupFull}>
              <div className={styles.labelRow}>
                <label className={styles.label}>
                  CUST ID <span className={styles.required}>*</span>
                  <span className={styles.formatHint}>Format: Name(5) - Country(3) - City(4) - Location(4)</span>
                </label>
                {fetching && <span className={styles.fetchingText}>Fetching record...</span>}
              </div>
              <div className={styles.custIdInputs}>
                <div className={styles.segment}>
                  <span className={styles.segmentLabel}>Name (5)</span>
                  <input
                    type="text"
                    maxLength={5}
                    value={custNamePart}
                    onChange={(e) => setCustNamePart(e.target.value.toUpperCase())}
                    className={`${styles.segmentInput} ${errors.custId ? styles.inputError : ''}`}
                  />
                </div>
                <span className={styles.hyphen}>-</span>
                <div className={styles.segment}>
                  <span className={styles.segmentLabel}>Country (3)</span>
                  <input
                    type="text"
                    maxLength={3}
                    value={custCountryPart}
                    onChange={(e) => setCustCountryPart(e.target.value.toUpperCase())}
                    className={`${styles.segmentInput} ${errors.custId ? styles.inputError : ''}`}
                  />
                </div>
                <span className={styles.hyphen}>-</span>
                <div className={styles.segment}>
                  <span className={styles.segmentLabel}>City (4)</span>
                  <input
                    type="text"
                    maxLength={4}
                    value={custCityPart}
                    onChange={(e) => setCustCityPart(e.target.value.toUpperCase())}
                    className={`${styles.segmentInput} ${errors.custId ? styles.inputError : ''}`}
                  />
                </div>
                <span className={styles.hyphen}>-</span>
                <div className={styles.segment}>
                  <span className={styles.segmentLabel}>Location (4)</span>
                  <input
                    type="text"
                    maxLength={4}
                    value={custLocPart}
                    onChange={(e) => setCustLocPart(e.target.value.toUpperCase())}
                    className={`${styles.segmentInput} ${errors.custId ? styles.inputError : ''}`}
                  />
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  disabled={fetching || !isCustIdComplete}
                  onClick={() => fetchRecordByCustId(composedCustId, true)}
                  className={styles.fetchBtn}
                >
                  {fetching ? 'Fetching...' : 'Fetch'}
                </Button>
              </div>
              {errors.custId && <p className={styles.errorText}>{errors.custId}</p>}
            </div>

            {/* 3. CUST Name (Editable) */}
            <div className={styles.formGroup}>
              <label htmlFor="cust-name" className={styles.label}>
                CUST Name <span className={styles.required}>*</span>
              </label>
              <Input
                id="cust-name"
                value={custName}
                onChange={(e) => setCustName(e.target.value)}
                error={errors.custName}
              />
            </div>

            {/* 4. SKU ID (Editable) */}
            <div className={styles.formGroup}>
              <label htmlFor="sku-id" className={styles.label}>
                SKU ID <span className={styles.required}>*</span>
              </label>
              <Input
                id="sku-id"
                value={skuId}
                onChange={(e) => setSkuId(e.target.value)}
                error={errors.skuId}
              />
            </div>

            {/* 5. SKU Name 1 (Separate text field with fixed text) */}
            <div className={styles.formGroup}>
              <label htmlFor="sku-name-1" className={styles.label}>
                SKU Name 1 <span className={styles.lockedNote}>(Fixed)</span>
              </label>
              <Input
                id="sku-name-1"
                value={SKU_NAME_1_FIXED}
                readOnly
                disabled
                className={styles.lockedInput}
              />
            </div>

            {/* 6. Delivery Time 1 (Days) (Editable) */}
            <div className={styles.formGroup}>
              <label htmlFor="delivery-time-1" className={styles.label}>
                Delivery Time 1 (Days)
              </label>
              <Input
                id="delivery-time-1"
                type="number"
                min="1"
                value={deliveryTime1Days}
                onChange={(e) => setDeliveryTime1Days(e.target.value)}
                error={errors.deliveryTime1Days}
              />
              <span className={styles.fieldNote}>Turnaround for Necklace/ Bracelate. Leave blank to clear.</span>
            </div>

            {/* 7. SKU Name 2 (Separate text field with fixed text) */}
            <div className={styles.formGroup}>
              <label htmlFor="sku-name-2" className={styles.label}>
                SKU Name 2 <span className={styles.lockedNote}>(Fixed)</span>
              </label>
              <Input
                id="sku-name-2"
                value={SKU_NAME_2_FIXED}
                readOnly
                disabled
                className={styles.lockedInput}
              />
            </div>

            {/* 8. Delivery Time 2 (Days) (Editable) */}
            <div className={styles.formGroup}>
              <label htmlFor="delivery-time-2" className={styles.label}>
                Delivery Time 2 (Days)
              </label>
              <Input
                id="delivery-time-2"
                type="number"
                min="1"
                value={deliveryTime2Days}
                onChange={(e) => setDeliveryTime2Days(e.target.value)}
                error={errors.deliveryTime2Days}
              />
              <span className={styles.fieldNote}>Turnaround for Ring/ Pendent/ Earing. Leave blank to clear.</span>
            </div>
          </div>

          {/* Form Actions - Single Update Action with Auto-Clear on Success */}
          <div className={styles.formActions}>
            <Button type="submit" variant="primary" disabled={submitting || fetching}>
              {submitting ? 'Saving Changes...' : 'Update Record'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
