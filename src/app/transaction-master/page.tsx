'use client';

import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import {
  ProcessedTransactionRow,
  ProductionOrderSummaryData,
} from '@/lib/transaction-engine';
import styles from './transaction-master.module.css';

export default function TransactionMasterPage() {
  const { showToast } = useToast();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [validating, setValidating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Validation results
  const [fileName, setFileName] = useState('');
  const [totalRows, setTotalRows] = useState(0);
  const [validRows, setValidRows] = useState(0);
  const [invalidRows, setInvalidRows] = useState(0);
  const [processedRows, setProcessedRows] = useState<ProcessedTransactionRow[]>([]);
  const [poSummaries, setPoSummaries] = useState<ProductionOrderSummaryData[]>([]);
  const [submittedUploadBatchId, setSubmittedUploadBatchId] = useState<string | null>(null);

  // UI tabs & filtering
  const [activeTab, setActiveTab] = useState<'transactions' | 'pos'>('transactions');
  const [tableSearch, setTableSearch] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // File selection handlers
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      resetValidationState();
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      resetValidationState();
    }
  }

  function resetValidationState() {
    setProcessedRows([]);
    setPoSummaries([]);
    setTotalRows(0);
    setValidRows(0);
    setInvalidRows(0);
    setSubmittedUploadBatchId(null);
  }

  // Execute Read & Validate Dataset
  async function handleValidateFile() {
    if (!selectedFile) {
      showToast('error', 'Please select a CSV or Excel file to upload');
      return;
    }

    try {
      setValidating(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await fetch('/api/transaction-master/validate', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        showToast('error', json.error || 'Failed to validate dataset');
        return;
      }

      setFileName(json.fileName || selectedFile.name);
      setTotalRows(json.totalRows || 0);
      setValidRows(json.validRows || 0);
      setInvalidRows(json.invalidRows || 0);
      setProcessedRows(json.rows || []);
      setPoSummaries(json.poSummaries || []);
      setSubmittedUploadBatchId(null);

      if (json.invalidRows > 0) {
        showToast('warning', `Parsed ${json.totalRows} rows (${json.invalidRows} invalid rows flagged). Submission disabled.`);
      } else {
        showToast('success', `Successfully validated ${json.totalRows} transaction records`);
      }
    } catch (err) {
      console.error('Validation error:', err);
      showToast('error', 'Network error during dataset validation');
    } finally {
      setValidating(false);
    }
  }

  // Execute Submission to database
  async function handleSubmitDataset() {
    if (processedRows.length === 0) {
      showToast('error', 'No validated transaction records to submit');
      return;
    }

    if (invalidRows > 0) {
      showToast('error', 'Cannot submit dataset containing invalid records. Please resolve errors in source file and re-upload.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/transaction-master/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName,
          rows: processedRows,
          poSummaries,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        showToast('error', json.error || 'Failed to submit transaction dataset');
        return;
      }

      setSubmittedUploadBatchId(json.uploadBatchId);
      showToast('success', 'Transaction Master File submitted and stored successfully');
    } catch (err) {
      console.error('Submit error:', err);
      showToast('error', 'Network error during dataset submission');
    } finally {
      setSubmitting(false);
    }
  }

  // Filtered rows for Process-Level tab
  const filteredRows = useMemo(() => {
    if (!tableSearch.trim()) return processedRows;
    const q = tableSearch.trim().toLowerCase();
    return processedRows.filter(
      (r) =>
        r.rawCustId.toLowerCase().includes(q) ||
        r.prodOrder.toLowerCase().includes(q) ||
        r.batch.toLowerCase().includes(q) ||
        r.rawWorkCenter.toLowerCase().includes(q) ||
        r.rawSku.toLowerCase().includes(q) ||
        r.rawSkuType.toLowerCase().includes(q) ||
        r.processStatus.toLowerCase().includes(q)
    );
  }, [processedRows, tableSearch]);

  // Filtered PO Summaries for PO-Level tab
  const filteredPOs = useMemo(() => {
    if (!tableSearch.trim()) return poSummaries;
    const q = tableSearch.trim().toLowerCase();
    return poSummaries.filter(
      (p) =>
        p.prodOrder.toLowerCase().includes(q) ||
        p.custId.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        p.skuType.toLowerCase().includes(q) ||
        p.poStatus.toLowerCase().includes(q)
    );
  }, [poSummaries, tableSearch]);

  return (
    <div className={styles.container}>
      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumbNav}>
        <Link href="/" className={styles.homeCrumb}>Home</Link>
        <span className={styles.separator}>/</span>
        <Link href="/main" className={styles.navLink}>Main Screen</Link>
        <span className={styles.separator}>/</span>
        <span className={styles.currentCrumb}>Transaction Master File</span>
      </div>

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Transaction Master File</h1>
          <p className={styles.subtitle}>
            Upload, validate, and review the KAMA GB Time Analysis transaction dataset.
          </p>
        </div>
        <div className="page-header-actions">
          <Link href="/main">
            <Button variant="secondary">Main Screen</Button>
          </Link>
        </div>
      </div>

      {/* Step 1: Upload Dropzone Card */}
      <Card padding="lg" className={styles.uploadCard}>
        <div
          className={`${styles.uploadZone} ${isDragging ? styles.uploadZoneActive : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
          <h2 className={styles.uploadTitle}>Choose GB Time Analysis Dataset</h2>
          <p className={styles.uploadHelpText}>
            Drag and drop your file here, or click to browse. Supported formats: .csv, .xlsx, .xls
          </p>
          <Button type="button" variant="secondary" size="sm">
            Browse File
          </Button>
        </div>

        {selectedFile && (
          <div className={styles.selectedFileInfo}>
            <div>
              <div className={styles.fileName}>{selectedFile.name}</div>
              <div className={styles.fileMeta}>
                {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.type || 'Document'}
              </div>
            </div>
            <Button
              type="button"
              variant="primary"
              disabled={validating}
              onClick={handleValidateFile}
            >
              {validating ? 'Reading & Validating...' : 'Read & Validate Dataset'}
            </Button>
          </div>
        )}
      </Card>

      {/* Submission Success Banner */}
      {submittedUploadBatchId && (
        <div className={styles.successBanner}>
          <h2 className={styles.successTitle}>Transaction Dataset Submitted Successfully</h2>
          <div className={styles.successMeta}>
            Upload Batch ID: <code>{submittedUploadBatchId}</code> • Total Records Saved: {validRows} • POs Configured: {poSummaries.length}
          </div>
        </div>
      )}

      {/* Step 2: Stats & Overview (Rendered after file validation) */}
      {processedRows.length > 0 && (
        <>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Total Uploaded Rows</span>
              <span className={styles.statValue}>{totalRows}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Valid Records</span>
              <span className={`${styles.statValue} ${styles.statValueSuccess}`}>{validRows}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Invalid Rows</span>
              <span className={`${styles.statValue} ${invalidRows > 0 ? styles.statValueDanger : ''}`}>
                {invalidRows}
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Production Orders</span>
              <span className={`${styles.statValue} ${styles.statValueAccent}`}>
                {poSummaries.length}
              </span>
            </div>
          </div>

          {/* Validation Errors Callout if any */}
          {invalidRows > 0 && (
            <div className={styles.errorCallout}>
              <h2 className={styles.errorCalloutTitle}>
                Validation Issues Detected ({invalidRows} Rows Invalid) — Submission Disabled
              </h2>
              <ul className={styles.errorCalloutList}>
                {processedRows
                  .filter((r) => !r.isValid)
                  .slice(0, 10)
                  .map((r) => (
                    <li key={r.rowNumber}>
                      Row {r.rowNumber} (PO: {r.rawProdOrderBatch || 'N/A'}, CUST ID: {r.rawCustId || 'N/A'}): {r.validationError}
                    </li>
                  ))}
                {invalidRows > 10 && (
                  <li>...and {invalidRows - 10} more invalid rows.</li>
                )}
              </ul>
            </div>
          )}

          {/* Step 3: Non-Editable Dual-Level Review Tables */}
          <div className={styles.previewSection}>
            <div className={styles.previewHeader}>
              <div className={styles.tabControls}>
                <button
                  type="button"
                  onClick={() => setActiveTab('transactions')}
                  className={`${styles.tabButton} ${
                    activeTab === 'transactions' ? styles.tabButtonActive : ''
                  }`}
                >
                  1. Process-Level Transactions ({processedRows.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('pos')}
                  className={`${styles.tabButton} ${
                    activeTab === 'pos' ? styles.tabButtonActive : ''
                  }`}
                >
                  2. PO-Level Summary ({poSummaries.length})
                </button>
              </div>

              <input
                type="text"
                placeholder="Filter preview data..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className={styles.tableSearchInput}
              />
            </div>

            {/* Tab 1: Process-Level Transactions Table */}
            {activeTab === 'transactions' && (
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Status</th>
                      <th>CUST ID</th>
                      <th>Prod Order</th>
                      <th>Batch</th>
                      <th>Work Center</th>
                      <th>SKU</th>
                      <th>SKU Type</th>
                      <th>Entry Timestamp</th>
                      <th>Exit Timestamp</th>
                      <th>Actual Time</th>
                      <th>Expected CT</th>
                      <th>Delay</th>
                      <th>Validation Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((r) => (
                      <tr key={r.rowNumber} className={!r.isValid ? styles.rowInvalid : ''}>
                        <td>{r.rowNumber}</td>
                        <td>
                          {!r.isValid ? (
                            <span className={styles.badgeInvalid}>INVALID</span>
                          ) : r.processStatus === 'FLAG' ? (
                            <span className={styles.badgeFlag}>FLAG</span>
                          ) : (
                            <span className={styles.badgeNormal}>NORMAL</span>
                          )}
                        </td>
                        <td className={styles.codeCell}>{r.rawCustId}</td>
                        <td className={styles.codeCell}>{r.prodOrder || r.rawProdOrderBatch}</td>
                        <td className={styles.codeCell}>{r.batch || '-'}</td>
                        <td>{r.rawWorkCenter}</td>
                        <td className={styles.codeCell}>{r.rawSku}</td>
                        <td>{r.rawSkuType}</td>
                        <td>{r.entryTimestamp ? new Date(r.entryTimestamp).toLocaleString() : r.rawEntryDate + ' ' + r.rawEntryTime}</td>
                        <td>{r.exitTimestamp ? new Date(r.exitTimestamp).toLocaleString() : r.rawExitDate + ' ' + r.rawExitTime}</td>
                        <td className={styles.numberCell}>
                          {r.isValid ? `${r.actualProcessTime.toFixed(2)} Hrs` : '-'}
                        </td>
                        <td className={styles.numberCell}>
                          {r.isValid && r.expectedCycleTime !== null ? `${r.expectedCycleTime} Hrs` : '-'}
                        </td>
                        <td className={styles.numberCell}>
                          {r.isValid ? (r.delayHours > 0 ? `${r.delayHours.toFixed(2)} Hrs` : '0 Hrs') : '-'}
                        </td>
                        <td>
                          {r.validationError ? (
                            <span className={styles.errorText}>{r.validationError}</span>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 2: PO-Level Summary Table */}
            {activeTab === 'pos' && (
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Prod Order</th>
                      <th>CUST ID</th>
                      <th>SKU</th>
                      <th>SKU Type</th>
                      <th>Batches</th>
                      <th>Total Actual Time</th>
                      <th>Configured Total CT</th>
                      <th>Total Delay</th>
                      <th>PO Status</th>
                      <th>Process Rows</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPOs.map((po) => (
                      <tr key={po.prodOrder}>
                        <td className={styles.codeCell}>{po.prodOrder}</td>
                        <td className={styles.codeCell}>{po.custId}</td>
                        <td className={styles.codeCell}>{po.sku || '-'}</td>
                        <td>{po.skuType}</td>
                        <td>
                          {po.numberOfBatches} ({po.batchesList.join(', ')})
                        </td>
                        <td className={styles.numberCell}>
                          {po.totalActualTime.toFixed(2)} Hrs
                        </td>
                        <td className={styles.numberCell}>
                          {po.configuredTotalCT !== null ? `${po.configuredTotalCT} Hrs` : '-'}
                        </td>
                        <td className={styles.numberCell}>
                          {po.totalDelay > 0 ? `${po.totalDelay.toFixed(2)} Hrs` : '0 Hrs'}
                        </td>
                        <td>
                          {po.poStatus === 'FLAG' ? (
                            <span className={styles.badgeFlag}>FLAG</span>
                          ) : (
                            <span className={styles.badgeNormal}>NORMAL</span>
                          )}
                        </td>
                        <td className={styles.numberCell}>{po.rowCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Step 4: Submission Action */}
            <div className={styles.submitFooter}>
              <span className={styles.submitNotice}>
                {invalidRows > 0
                  ? 'Submission is disabled: all rows in the dataset must be valid before submission.'
                  : 'Transaction records will be stored as immutable source data. Manual editing is restricted.'}
              </span>
              <Button
                type="submit"
                variant="primary"
                disabled={submitting || invalidRows > 0 || submittedUploadBatchId !== null}
                onClick={handleSubmitDataset}
              >
                {submitting
                  ? 'Submitting Transactions...'
                  : submittedUploadBatchId
                  ? 'Dataset Submitted'
                  : invalidRows > 0
                  ? 'Fix Invalid Rows to Submit'
                  : 'Submit Transaction Master File'}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
