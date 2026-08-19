'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import styles from './add.module.css';

const SKU_NAME_1_FIXED = 'Necklace/ Bracelate';
const SKU_NAME_2_FIXED = 'Ring/ Pendent/ Earing';

export default function MasterFileAddPage() {
  const { showToast } = useToast();

  // Form states - loaded blank by default
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

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Compute composite CUST ID
  const composedCustId = `${custNamePart.trim().toUpperCase()}-${custCountryPart.trim().toUpperCase()}-${custCityPart.trim().toUpperCase()}-${custLocPart.trim().toUpperCase()}`;

  function validateForm(): boolean {
    const errs: Record<string, string> = {};

    if (!id.trim()) {
      errs.id = 'ID is required (enter manually)';
    }

    // Validate CUST ID sections
    if (custNamePart.trim().length !== 5) {
      errs.custId = 'Name section must be exactly 5 characters';
    } else if (custCountryPart.trim().length !== 3) {
      errs.custId = 'Country section must be exactly 3 characters';
    } else if (custCityPart.trim().length !== 4) {
      errs.custId = 'City section must be exactly 4 characters';
    } else if (custLocPart.trim().length !== 4) {
      errs.custId = 'Location section must be exactly 4 characters';
    }

    if (!custName.trim()) {
      errs.custName = 'Customer Name is required';
    }

    if (!skuId.trim()) {
      errs.skuId = 'SKU ID is required';
    }

    // Check delivery times (at least one must be provided)
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      const res = await fetch('/api/master-file/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: id.trim(),
          custId: composedCustId,
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
        showToast('error', json.error || 'Failed to add record');
        return;
      }

      // Success
      showToast('success', 'Master File record added successfully');

      // Reset all form inputs to completely blank
      handleReset();
    } catch (err) {
      console.error('Submit error:', err);
      showToast('error', 'Network error while saving record');
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setId('');
    setCustNamePart('');
    setCustCountryPart('');
    setCustCityPart('');
    setCustLocPart('');
    setCustName('');
    setSkuId('');
    setDeliveryTime1Days('');
    setDeliveryTime2Days('');
    setErrors({});
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
        <span className={styles.currentCrumb}>Add</span>
      </div>

      <div className="page-header">
        <div>
          <h1>Master File Creation - Add Record</h1>
          <p className={styles.subtitle}>
            Enter Master File dataset record details manually.
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

      {/* Form Card */}
      <Card padding="lg" className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formSectionHeader}>
            <h2>Record Details</h2>
            <span className={styles.formHelpText}>
              All fields with * are required. Enter delivery time for either or both SKU types.
            </span>
          </div>

          <div className={styles.formGrid}>
            {/* 1. ID (Manual Generation) */}
            <div className={styles.formGroup}>
              <label htmlFor="record-id" className={styles.label}>
                ID <span className={styles.required}>*</span>
              </label>
              <Input
                id="record-id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                error={errors.id}
              />
              <span className={styles.fieldNote}>Manual entry. Enter a unique identifier.</span>
            </div>

            {/* 2. CUST ID (Structured: 5-3-4-4) */}
            <div className={styles.formGroupFull}>
              <label className={styles.label}>
                CUST ID <span className={styles.required}>*</span>
                <span className={styles.formatHint}>Format: Name(5) - Country(3) - City(4) - Location(4)</span>
              </label>
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
              </div>
              {errors.custId && <p className={styles.errorText}>{errors.custId}</p>}
            </div>

            {/* 3. CUST Name */}
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

            {/* 4. SKU ID */}
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

            {/* 6. Delivery Time 1 (Days) (Separate input field) */}
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
              <span className={styles.fieldNote}>Turnaround for Necklace/ Bracelate. Leave blank if none.</span>
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

            {/* 8. Delivery Time 2 (Days) (Separate input field) */}
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
              <span className={styles.fieldNote}>Turnaround for Ring/ Pendent/ Earing. Leave blank if none.</span>
            </div>
          </div>

          {/* Form Actions */}
          <div className={styles.formActions}>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? 'Saving Record...' : 'Submit Record'}
            </Button>
            <Button type="button" variant="secondary" onClick={handleReset}>
              Clear
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
