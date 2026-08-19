'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast';
import {
  PROCESS_SKU_TYPE_OPTIONS,
  formatCustIdInput,
} from '@/lib/validators';
import styles from '../reports.module.css';

interface ProcessTrackingItem {
  processLabel: string;
  processName: string;
  status: 'NORMAL' | 'FLAG' | 'MISSED';
  isMissed: boolean;
  standardHours: number | null;
  actualHours: number | null;
  delayHours: number | null;
  entryTimestamp: string | null;
  exitTimestamp: string | null;
  rawEntryDate: string | null;
  rawEntryTime: string | null;
  rawExitDate: string | null;
  rawExitTime: string | null;
}

interface BatchTracking {
  batchNumber: string;
  batchActualTime: number;
  processes: ProcessTrackingItem[];
}

interface SinglePOReport {
  basicInfo: {
    prodOrder: string;
    custId: string;
    custName: string;
    sku: string;
    skuType: string;
    normalizedSkuType: string;
  };
  summary: {
    batches: string[];
    numberOfBatches: number;
    standardSetTime: number | null;
    totalActualTime: number;
    totalDelay: number;
    poStatus: 'NORMAL' | 'FLAG';
    hasProcessConfig: boolean;
    missedProcessesCount: number;
    delayedProcessesCount: number;
  };
  batches: BatchTracking[];
}

export default function POVarianceReportPage() {
  const { showToast } = useToast();

  // Search Form State (Blank by default)
  const [custId, setCustId] = useState('');
  const [skuType, setSkuType] = useState('');
  const [prodOrder, setProdOrder] = useState('');

  // Report Data & Loading State
  const [reportsList, setReportsList] = useState<SinglePOReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Available SKU Type options for dropdown
  const skuTypeOptions = PROCESS_SKU_TYPE_OPTIONS.map((opt) => ({
    value: opt,
    label: opt,
  }));

  // Handle CUST ID formatting
  function handleCustIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatCustIdInput(e.target.value);
    setCustId(formatted);
  }

  // Generate Report Handler
  async function handleGenerateReport(e?: React.FormEvent) {
    if (e) e.preventDefault();

    const trimmedCustId = custId.trim();
    const trimmedSkuType = skuType.trim();
    const trimmedPO = prodOrder.trim();

    // 1. Validation: CUST ID and SKU Type are required. PO is optional.
    if (!trimmedCustId && !trimmedSkuType) {
      showToast('error', 'Please enter a CUST ID and select a SKU Type');
      return;
    }

    if (!trimmedCustId) {
      showToast('error', 'Please enter a CUST ID');
      return;
    }

    if (!trimmedSkuType) {
      showToast('error', 'Please select a SKU Type');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      setHasSearched(true);

      const params = new URLSearchParams({
        custId: trimmedCustId,
        skuType: trimmedSkuType,
      });

      if (trimmedPO) {
        params.set('prodOrder', trimmedPO);
      }

      const res = await fetch(`/api/reports/po-variance?${params.toString()}`);
      const json = await res.json();

      if (!res.ok) {
        setReportsList([]);
        setErrorMessage(
          json.error ||
            `No matching report data found for CUST ID "${trimmedCustId}" and SKU Type "${trimmedSkuType}"${
              trimmedPO ? ` and PO "${trimmedPO}"` : ''
            }.`
        );
        showToast('error', json.error || 'No matching data found');
        return;
      }

      const list: SinglePOReport[] = json.reports && Array.isArray(json.reports)
        ? json.reports
        : json.basicInfo
        ? [json]
        : [];

      setReportsList(list);
      showToast(
        'success',
        list.length === 1
          ? `Report generated for PO ${list[0].basicInfo.prodOrder}`
          : `Loaded ${list.length} Production Order reports for ${trimmedCustId}`
      );
    } catch (err) {
      console.error('Report fetch error:', err);
      setReportsList([]);
      setErrorMessage('Network error occurred while fetching report data.');
      showToast('error', 'Network error occurred while fetching report');
    } finally {
      setLoading(false);
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
        <Link href="/reports" className={styles.navLink}>Reports</Link>
        <span className={styles.separator}>/</span>
        <span className={styles.currentCrumb}>Report 1 — Production Order Process Variance</span>
      </div>

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Production Order Process Variance & Timing Report</h1>
          <p className={styles.subtitle}>
            Variance analysis comparing actual production order timing against Process Master standards.
          </p>
        </div>
        <div className="page-header-actions">
          <Link href="/reports">
            <Button variant="secondary">Reports Menu</Button>
          </Link>
          <Link href="/main">
            <Button variant="ghost">Main Screen</Button>
          </Link>
        </div>
      </div>

      {/* Search & Generation Card */}
      <Card padding="md" className={styles.searchCard}>
        <div className={styles.searchHeader}>
          <h2 className={styles.searchTitle}>Generate Production Order Report</h2>
          <p className={styles.searchSubtitle}>
            Enter the Customer ID and SKU Type. Production Order is optional (leave blank to view all POs for this customer & SKU Type).
          </p>
        </div>

        <form onSubmit={handleGenerateReport} className={styles.formGrid}>
          {/* 1. CUST ID Field (Required) */}
          <div className={styles.formField}>
            <label htmlFor="report-cust-id" className={styles.formLabel}>
              CUST ID *
            </label>
            <input
              id="report-cust-id"
              type="text"
              value={custId}
              onChange={handleCustIdChange}
              placeholder=""
              maxLength={19}
              className={styles.formInput}
            />
          </div>

          {/* 2. SKU Type Dropdown (Required) */}
          <div className={styles.formField}>
            <label htmlFor="report-sku-type" className={styles.formLabel}>
              SKU Type *
            </label>
            <Select
              id="report-sku-type"
              value={skuType}
              onChange={(e) => setSkuType(e.target.value)}
              options={skuTypeOptions}
              placeholder="Select SKU Type"
            />
          </div>

          {/* 3. Production Order (PO) Field (Optional) */}
          <div className={styles.formField}>
            <label htmlFor="report-prod-order" className={styles.formLabel}>
              Production Order (PO) <span className={styles.optionalTag}>(Optional)</span>
            </label>
            <input
              id="report-prod-order"
              type="text"
              value={prodOrder}
              onChange={(e) => setProdOrder(e.target.value)}
              placeholder=""
              maxLength={20}
              className={styles.formInput}
            />
          </div>

          {/* 4. Action Button */}
          <div className={styles.formActions}>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              style={{ minWidth: '160px', height: '40px' }}
            >
              {loading ? 'Generating...' : 'Generate Report'}
            </Button>
          </div>
        </form>
      </Card>

      {/* Initial Prompt State (Before User Generates) */}
      {!hasSearched && reportsList.length === 0 && (
        <div className={styles.initialPromptCard}>
          <h2 className={styles.initialPromptTitle}>Ready to Generate Report</h2>
          <p className={styles.initialPromptText}>
            Provide the CUST ID and SKU Type above, then click &quot;Generate Report&quot; to load the variance analysis for all matching production orders (or specify a single PO).
          </p>
        </div>
      )}

      {/* Error / No Data Found Message */}
      {hasSearched && errorMessage && reportsList.length === 0 && (
        <div className={styles.errorCard}>
          <h3 className={styles.errorTitle}>No Matching Data Found</h3>
          <p className={styles.errorText}>{errorMessage}</p>
        </div>
      )}

      {/* Generated Report Content: Render each PO report section vertically */}
      {reportsList.length > 0 && (
        <div className={styles.reportsListContainer}>
          {reportsList.map((report) => {
            const hasStandard = report.summary.standardSetTime !== null;
            const isOverTime =
              hasStandard &&
              report.summary.totalActualTime > (report.summary.standardSetTime as number);
            const isUnderTime =
              hasStandard &&
              report.summary.totalActualTime < (report.summary.standardSetTime as number);

            const actualTimeClass = isOverTime
              ? `${styles.summaryValue} ${styles.summaryValueOver}`
              : isUnderTime
              ? `${styles.summaryValue} ${styles.summaryValueUnder}`
              : styles.summaryValue;

            return (
              <div key={report.basicInfo.prodOrder} className={styles.poReportSection}>
                {/* 3. Dedicated Production Order Identification Card ABOVE Row 1 */}
                <div className={styles.poIdentifierCard}>
                  <div>
                    <span className={styles.poIdentifierLabel}>Production Order</span>
                    <div className={styles.poIdentifierNumber}>{report.basicInfo.prodOrder}</div>
                  </div>
                  <div className={styles.batchBadge}>
                    {report.summary.numberOfBatches} Batch{report.summary.numberOfBatches > 1 ? 'es' : ''} ({report.summary.batches.join(', ')})
                  </div>
                </div>

                {/* Missing Process Master Config Warning */}
                {!report.summary.hasProcessConfig && (
                  <div className={styles.warningCard}>
                    <h3 className={styles.warningTitle}>Missing Process Master Configuration</h3>
                    <p className={styles.warningText}>
                      No Process Master configuration was found for Customer ID <strong>{report.basicInfo.custId}</strong> and SKU Type <strong>{report.basicInfo.skuType}</strong>. Expected cycle times and process completion checks cannot be evaluated until process routings are configured in Process Creation.
                    </p>
                  </div>
                )}

                {/* ROW 1 — Basic PO Information */}
                <div className={styles.infoSection}>
                  <h2 className={styles.sectionHeading}>Row 1 — Basic Production Order Information</h2>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoCard}>
                      <span className={styles.infoLabel}>Customer (CUST ID)</span>
                      <span className={styles.infoValue}>{report.basicInfo.custId}</span>
                      <span className={styles.infoSubValue}>{report.basicInfo.custName}</span>
                    </div>
                    <div className={styles.infoCard}>
                      <span className={styles.infoLabel}>Production Order (PO)</span>
                      <span className={styles.infoValue}>{report.basicInfo.prodOrder}</span>
                      <span className={styles.infoSubValue}>SKU: {report.basicInfo.sku || 'N/A'}</span>
                    </div>
                    <div className={styles.infoCard}>
                      <span className={styles.infoLabel}>SKU Type</span>
                      <span className={styles.infoValue}>{report.basicInfo.skuType}</span>
                      <span className={styles.infoSubValue}>Configured Product Line</span>
                    </div>
                  </div>
                </div>

                {/* ROW 2 — PO/Batch Summary */}
                <div className={styles.infoSection}>
                  <h2 className={styles.sectionHeading}>Row 2 — PO & Batch Timing Summary</h2>
                  <div className={styles.summaryGrid}>
                    <div className={styles.summaryCard}>
                      <span className={styles.summaryLabel}>Production Batches</span>
                      <span className={styles.summaryValue}>
                        {report.summary.numberOfBatches} ({report.summary.batches.join(', ')})
                      </span>
                      <span className={styles.summarySubtext}>Distinct Production Runs</span>
                    </div>

                    <div className={styles.summaryCard}>
                      <span className={styles.summaryLabel}>Standard Set Time</span>
                      <span className={`${styles.summaryValue} ${styles.summaryValueHighlight}`}>
                        {report.summary.standardSetTime !== null
                          ? `${report.summary.standardSetTime.toFixed(2)} Hours`
                          : 'Not Configured'}
                      </span>
                      <span className={styles.summarySubtext}>From Process Master File</span>
                    </div>

                    {/* PO TOTAL ACTUAL TIME with Dynamic Status Color */}
                    <div className={styles.summaryCard}>
                      <span className={styles.summaryLabel}>PO Total Actual Time</span>
                      <span className={actualTimeClass}>
                        {report.summary.totalActualTime.toFixed(2)} Hours
                      </span>
                      <span className={styles.summarySubtext}>Sum of All Batches & Processes</span>
                    </div>

                    <div className={styles.summaryCard}>
                      <span className={styles.summaryLabel}>PO Timing Status / Flags</span>
                      <div>
                        {report.summary.poStatus === 'FLAG' ? (
                          <span className={styles.badgeFlag}>
                            PO FLAG (+{report.summary.totalDelay.toFixed(2)} Hrs Delay)
                          </span>
                        ) : (
                          <span className={styles.badgeNormal}>NORMAL</span>
                        )}
                      </div>
                      <span className={styles.summarySubtext}>
                        {report.summary.missedProcessesCount > 0 && `${report.summary.missedProcessesCount} Missed Process(es) • `}
                        {report.summary.delayedProcessesCount > 0 && `${report.summary.delayedProcessesCount} Delayed Process(es)`}
                        {report.summary.missedProcessesCount === 0 && report.summary.delayedProcessesCount === 0 && 'All Processes Completed on Time'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ROW 3 — Process Tracking Grouped by Batch */}
                <div className={styles.trackingSection}>
                  <h2 className={styles.sectionHeading}>Row 3 — Process Tracking & Completion Analysis</h2>

                  {report.batches.map((batch) => (
                    <div key={batch.batchNumber} className={styles.batchCard}>
                      <div className={styles.batchHeader}>
                        <div className={styles.batchTitleGroup}>
                          <h3 className={styles.batchTitle}>
                            Production Batch: {batch.batchNumber}
                          </h3>
                          <span className={styles.batchBadge}>
                            PO {report.basicInfo.prodOrder} — Batch {batch.batchNumber}
                          </span>
                        </div>
                        <div className={styles.batchTimeInfo}>
                          Batch Actual Time: {batch.batchActualTime.toFixed(2)} Hours
                        </div>
                      </div>

                      <div className={styles.tableContainer}>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <th>Configured Process</th>
                              <th>Process Status</th>
                              <th>Standard Set Time</th>
                              <th>Actual Process Time</th>
                              <th>Delay</th>
                              <th>Entry Timestamp</th>
                              <th>Exit Timestamp</th>
                            </tr>
                          </thead>
                          <tbody>
                            {batch.processes.map((proc) => {
                              const isMissed = proc.isMissed;
                              const isFlag = proc.status === 'FLAG';

                              return (
                                <tr key={proc.processLabel} className={isMissed ? styles.rowMissed : ''}>
                                  <td className={styles.codeCell}>{proc.processLabel}</td>
                                  <td>
                                    {isMissed ? (
                                      <span className={styles.badgeMissed}>MISSED</span>
                                    ) : isFlag ? (
                                      <span className={styles.badgeFlag}>
                                        FLAG (+{proc.delayHours?.toFixed(2)} Hrs)
                                      </span>
                                    ) : (
                                      <span className={styles.badgeNormal}>Completed</span>
                                    )}
                                  </td>
                                  <td className={styles.numberCell}>
                                    {proc.standardHours !== null ? `${proc.standardHours} Hours` : '-'}
                                  </td>
                                  <td className={styles.numberCell}>
                                    {proc.actualHours !== null ? `${proc.actualHours.toFixed(2)} Hours` : '-'}
                                  </td>
                                  <td className={styles.numberCell}>
                                    {proc.delayHours !== null && proc.delayHours > 0
                                      ? `+${proc.delayHours.toFixed(2)} Hours`
                                      : proc.delayHours !== null
                                      ? '0 Hours'
                                      : '-'}
                                  </td>
                                  <td>
                                    {proc.entryTimestamp
                                      ? new Date(proc.entryTimestamp).toLocaleString()
                                      : proc.rawEntryDate
                                      ? `${proc.rawEntryDate} ${proc.rawEntryTime}`
                                      : '-'}
                                  </td>
                                  <td>
                                    {proc.exitTimestamp
                                      ? new Date(proc.exitTimestamp).toLocaleString()
                                      : proc.rawExitDate
                                      ? `${proc.rawExitDate} ${proc.rawExitTime}`
                                      : '-'}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
