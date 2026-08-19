import * as XLSX from 'xlsx';
import { prisma } from './prisma';
import { PROCESS_LIST, PROCESS_SKU_TYPE_OPTIONS } from './validators';

export interface RawTransactionRow {
  custId?: string;
  prodOrderBatch?: string;
  workCenter?: string;
  sku?: string;
  skuType?: string;
  entryDate?: string;
  entryTime?: string;
  exitDate?: string;
  exitTime?: string;
  [key: string]: any;
}

export interface ProcessedTransactionRow {
  rowNumber: number;
  rawCustId: string;
  rawProdOrderBatch: string;
  rawWorkCenter: string;
  rawSku: string;
  rawSkuType: string;
  rawEntryDate: string;
  rawEntryTime: string;
  rawExitDate: string;
  rawExitTime: string;

  // Derived Fields
  prodOrder: string;
  batch: string;
  entryTimestamp: string | null;
  exitTimestamp: string | null;
  actualProcessTime: number; // in hours
  expectedCycleTime: number | null; // in hours from ProcessMasterFile
  delayHours: number;
  processStatus: 'NORMAL' | 'FLAG';

  // Validation
  isValid: boolean;
  validationError: string | null;
}

export interface ProductionOrderSummaryData {
  prodOrder: string;
  custId: string;
  sku: string;
  skuType: string;
  numberOfBatches: number;
  batchesList: string[];
  totalActualTime: number; // in hours across all batches (valid rows only)
  configuredTotalCT: number | null; // in hours from ProcessMasterFile
  totalDelay: number;
  poStatus: 'NORMAL' | 'FLAG';
  rowCount: number;
}

export interface ValidationResult {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  rows: ProcessedTransactionRow[];
  poSummaries: ProductionOrderSummaryData[];
}

/**
 * Normalizes SKU Type string to match exact Process Master options
 */
export function normalizeSkuType(raw: string): string {
  if (!raw) return '';
  const trimmed = raw.trim();
  const lower = trimmed.toLowerCase().replace(/\s+/g, ' ');

  for (const opt of PROCESS_SKU_TYPE_OPTIONS) {
    if (opt.toLowerCase().replace(/\s+/g, ' ') === lower) {
      return opt;
    }
  }

  // Check loose matches for 'Ring / Pendant / Earing' vs 'Ring/ Pendent/ Earing'
  if (
    lower.includes('ring') ||
    lower.includes('pendant') ||
    lower.includes('pendent') ||
    lower.includes('earing') ||
    lower.includes('earring')
  ) {
    return 'Ring / Pendant / Earing';
  }
  if (
    lower.includes('necklace') ||
    lower.includes('bracelate') ||
    lower.includes('bracelet')
  ) {
    return 'Necklace/ Bracelate';
  }
  if (lower.includes('silver')) {
    return 'Silver';
  }
  if (lower.includes('finding')) {
    return 'Findings';
  }

  return trimmed;
}

/**
 * Normalizes Work Center to match PROCESS_LIST
 */
export function normalizeWorkCenter(raw: string): { label: string; name: string } | null {
  if (!raw) return null;
  const clean = raw.trim().toUpperCase();

  // Try exact label match (e.g. "01 - WAXINJET")
  const exactLabel = PROCESS_LIST.find((p) => p.label.toUpperCase() === clean);
  if (exactLabel) return { label: exactLabel.label, name: exactLabel.name };

  // Try process name match (e.g. "WAXINJET")
  const exactName = PROCESS_LIST.find((p) => p.name.toUpperCase() === clean);
  if (exactName) return { label: exactName.label, name: exactName.name };

  // Try partial match without prefix numbers (e.g. "01 - WAXINJET" -> "WAXINJET")
  const withoutDigits = clean.replace(/^[0-9\s\-]+/, '').trim();
  const partial = PROCESS_LIST.find((p) => p.name.toUpperCase() === withoutDigits);
  if (partial) return { label: partial.label, name: partial.name };

  return null;
}

/**
 * Converts Excel Serial Date / Time to formatted string if applicable
 */
function formatExcelSerialValue(val: any): string {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string') return val.trim();

  // If numeric serial
  if (typeof val === 'number') {
    // If it looks like an Excel Date Serial (e.g. 46188 = 2026-06-15)
    if (val >= 25000 && val <= 70000) {
      const excelEpoch = new Date(1899, 11, 30);
      const date = new Date(excelEpoch.getTime() + val * 86400000);
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
    // If it looks like an Excel Time Fraction (e.g. 0.37605 = 9:01:31 AM)
    if (val >= 0 && val < 1) {
      const totalSec = Math.round(val * 86400);
      const h = Math.floor(totalSec / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;
      const ampm = h >= 12 ? 'PM' : 'AM';
      const dispH = h % 12 || 12;
      const pad = (n: number) => String(n).padStart(2, '0');
      return `${dispH}:${pad(m)}:${pad(s)} ${ampm}`;
    }
    return String(val);
  }

  // If JavaScript Date object
  if (val instanceof Date && !isNaN(val.getTime())) {
    return `${val.getMonth() + 1}/${val.getDate()}/${val.getFullYear()}`;
  }

  return String(val).trim();
}

/**
 * Parses date string or Excel serial number into YYYY, MM, DD components
 */
function parseDateComponents(dateStr: string): { year: number; month: number; day: number } | null {
  if (!dateStr) return null;
  const str = String(dateStr).trim();

  // Check Excel numeric serial date (e.g. 46188)
  const num = parseFloat(str);
  if (!isNaN(num) && num >= 25000 && num <= 70000 && !str.includes('/') && !str.includes('-')) {
    const excelEpoch = new Date(1899, 11, 30);
    const date = new Date(excelEpoch.getTime() + num * 86400000);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  // Format: M/D/YYYY or MM/DD/YYYY or M/D/YY
  const slashMatch = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
  if (slashMatch) {
    const p1 = parseInt(slashMatch[1], 10);
    const p2 = parseInt(slashMatch[2], 10);
    let year = parseInt(slashMatch[3], 10);
    if (year < 100) year += 2000;

    // Standard MM/DD/YYYY vs DD/MM/YYYY
    if (p1 <= 12) {
      return { year, month: p1, day: p2 };
    } else {
      return { year, month: p2, day: p1 };
    }
  }

  // Format: DD-MM-YYYY or D-M-YYYY or DD-MM-YY
  const dashMatch = str.match(/^(\d{1,2})-(\d{1,2})-(\d{2,4})/);
  if (dashMatch) {
    const p1 = parseInt(dashMatch[1], 10);
    const p2 = parseInt(dashMatch[2], 10);
    let year = parseInt(dashMatch[3], 10);
    if (year < 100) year += 2000;

    if (p2 <= 12 && p1 > 12) {
      return { year, month: p2, day: p1 };
    } else {
      return { year, month: p1, day: p2 };
    }
  }

  // Format: YYYY-MM-DD
  const isoMatch = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10);
    const day = parseInt(isoMatch[3], 10);
    return { year, month, day };
  }

  // Fallback Date.parse
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    return {
      year: parsed.getFullYear(),
      month: parsed.getMonth() + 1,
      day: parsed.getDate(),
    };
  }

  return null;
}

/**
 * Parses time string (12-hour AM/PM or 24-hour) into hours, minutes, seconds
 */
function parseTimeComponents(timeStr: string): { hours: number; minutes: number; seconds: number } | null {
  if (!timeStr) return null;
  const str = String(timeStr).trim();

  // Excel serial fraction (e.g. 0.37605)
  const num = parseFloat(str);
  if (!isNaN(num) && num >= 0 && num < 1 && !str.includes(':')) {
    const totalSeconds = Math.round(num * 86400);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
  }

  // Format: HH:MM:SS AM/PM or HH:MM AM/PM
  const ampmMatch = str.match(/^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?\s*(AM|PM)?$/i);
  if (ampmMatch) {
    let hours = parseInt(ampmMatch[1], 10);
    const minutes = parseInt(ampmMatch[2], 10);
    const seconds = ampmMatch[3] ? parseInt(ampmMatch[3], 10) : 0;
    const ampm = ampmMatch[4] ? ampmMatch[4].toUpperCase() : null;

    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;

    return { hours, minutes, seconds };
  }

  return null;
}

/**
 * Combines Date string and Time string into a robust Date object
 */
export function parseCombinedTimestamp(dateStr: string, timeStr: string): Date | null {
  const d = parseDateComponents(dateStr);
  const t = parseTimeComponents(timeStr);

  if (!d || !t) return null;

  const res = new Date(d.year, d.month - 1, d.day, t.hours, t.minutes, t.seconds);
  return isNaN(res.getTime()) ? null : res;
}

/**
 * Extracts 7-digit Prod Order and 3-digit Batch from 'Prod Order - Batch'
 */
export function extractProdOrderAndBatch(raw: string): { prodOrder: string; batch: string } | null {
  if (!raw) return null;
  const clean = String(raw).trim();

  // If contains hyphen or space separator e.g. "3293554-001" or "3293554 001"
  const splitMatch = clean.match(/^(\d{7})[\s\-_/]+(\d{1,4})$/);
  if (splitMatch) {
    return {
      prodOrder: splitMatch[1],
      batch: splitMatch[2].padStart(3, '0'),
    };
  }

  // Pure digits: first 7 digits = PO, last 3 digits = Batch (e.g. "3293554001")
  const digitMatch = clean.match(/^(\d{7})(\d{3})$/);
  if (digitMatch) {
    return {
      prodOrder: digitMatch[1],
      batch: digitMatch[2],
    };
  }

  // If 10+ digits, take first 7 as PO, rest as Batch
  const longDigits = clean.replace(/\D/g, '');
  if (longDigits.length >= 10) {
    return {
      prodOrder: longDigits.slice(0, 7),
      batch: longDigits.slice(7, 10),
    };
  }

  return null;
}

/**
 * Helper to normalize column header strings for comparison
 */
function cleanHeaderString(hdr: any): string {
  if (!hdr) return '';
  return String(hdr)
    .toLowerCase()
    .replace(/[\r\n\t_]/g, ' ')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * Reads uploaded file buffer (CSV, XLSX, XLS) into raw row objects using robust header detection
 */
export function parseUploadedFileBuffer(buffer: Buffer): RawTransactionRow[] {
  // Read workbook with cellDates: false to get formatted strings
  const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: false, cellText: true });
  
  // Pick the best worksheet
  let targetSheetName = workbook.SheetNames[0];
  for (const name of workbook.SheetNames) {
    const nLow = name.toLowerCase();
    if (nLow.includes('time analysis') || nLow.includes('gb') || nLow.includes('transaction')) {
      targetSheetName = name;
      break;
    }
  }

  const sheet = workbook.Sheets[targetSheetName];
  if (!sheet) return [];

  // Convert to 2D array (rows of cells)
  const rows2D: any[][] = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: '',
    raw: false,
    blankrows: false,
  });

  if (!rows2D || rows2D.length === 0) return [];

  // Find the header row by matching keywords
  let headerRowIndex = -1;
  let bestScore = 0;

  for (let r = 0; r < Math.min(rows2D.length, 15); r++) {
    const row = rows2D[r];
    if (!Array.isArray(row)) continue;

    let score = 0;
    for (const cell of row) {
      const clean = cleanHeaderString(cell);
      if (clean.includes('cust')) score += 3;
      if (clean.includes('prod order') || clean.includes('order') || clean.includes('batch')) score += 3;
      if (clean.includes('work center') || clean.includes('work centre') || clean.includes('process')) score += 3;
      if (clean === 'sku' || clean === 'sku type' || clean.includes('skutype')) score += 3;
      if (clean.includes('entry') || clean.includes('exit')) score += 2;
    }

    if (score > bestScore) {
      bestScore = score;
      headerRowIndex = r;
    }
  }

  // Fallback to row 0 if no clear header was detected
  if (headerRowIndex === -1 || bestScore < 4) {
    headerRowIndex = 0;
  }

  const headerRow = rows2D[headerRowIndex] || [];

  // Map column index to internal field name
  const colMap: {
    custId?: number;
    prodOrderBatch?: number;
    workCenter?: number;
    sku?: number;
    skuType?: number;
    entryDate?: number;
    entryTime?: number;
    exitDate?: number;
    exitTime?: number;
  } = {};

  headerRow.forEach((cell, idx) => {
    const clean = cleanHeaderString(cell);
    const compact = clean.replace(/\s+/g, '');

    // 1. CUST ID
    if (clean.includes('cust') || compact.includes('custid') || compact.includes('customer')) {
      colMap.custId = idx;
    }
    // 2. Prod Order - Batch
    else if (
      compact.includes('prodorder') ||
      compact.includes('pobatch') ||
      (clean.includes('order') && clean.includes('batch')) ||
      clean.includes('prod order') ||
      compact === 'prodorderbatch'
    ) {
      colMap.prodOrderBatch = idx;
    }
    // 3. Work Center
    else if (
      clean.includes('work center') ||
      clean.includes('work centre') ||
      compact.includes('workctr') ||
      compact === 'process' ||
      compact === 'workcenter'
    ) {
      colMap.workCenter = idx;
    }
    // 4. SKU Type (Check before SKU so 'sku type' doesn't get assigned to 'sku')
    else if (
      clean.includes('sku type') ||
      compact.includes('skutype') ||
      clean.includes('product type') ||
      clean.includes('category')
    ) {
      colMap.skuType = idx;
    }
    // 5. SKU (Exact SKU or Item Code)
    else if (
      (clean === 'sku' || compact === 'sku' || clean === 'sku id' || compact === 'skuid' || clean === 'item') &&
      !clean.includes('type')
    ) {
      colMap.sku = idx;
    }
    // 6. Entry Date
    else if (
      (clean.includes('entry') && clean.includes('date')) ||
      compact === 'entrydate' ||
      clean.includes('start date')
    ) {
      colMap.entryDate = idx;
    }
    // 7. Entry Time
    else if (
      (clean.includes('entry') && clean.includes('time')) ||
      compact === 'entrytime' ||
      clean.includes('start time')
    ) {
      colMap.entryTime = idx;
    }
    // 8. Exit Date
    else if (
      (clean.includes('exit') && clean.includes('date')) ||
      compact === 'exitdate' ||
      clean.includes('end date')
    ) {
      colMap.exitDate = idx;
    }
    // 9. Exit Time
    else if (
      (clean.includes('exit') && clean.includes('time')) ||
      compact === 'exittime' ||
      clean.includes('end time')
    ) {
      colMap.exitTime = idx;
    }
  });

  const parsedRows: RawTransactionRow[] = [];

  // Iterate rows starting from headerRowIndex + 1
  for (let r = headerRowIndex + 1; r < rows2D.length; r++) {
    const row = rows2D[r];
    if (!Array.isArray(row) || row.length === 0) continue;

    const getVal = (colIdx?: number): string => {
      if (colIdx === undefined || colIdx < 0 || colIdx >= row.length) return '';
      return formatExcelSerialValue(row[colIdx]);
    };

    const custId = getVal(colMap.custId);
    const prodOrderBatch = getVal(colMap.prodOrderBatch);
    const workCenter = getVal(colMap.workCenter);
    const sku = getVal(colMap.sku);
    const skuType = getVal(colMap.skuType);
    const entryDate = getVal(colMap.entryDate);
    const entryTime = getVal(colMap.entryTime);
    const exitDate = getVal(colMap.exitDate);
    const exitTime = getVal(colMap.exitTime);

    // Skip row if completely empty across all 9 fields
    if (
      !custId &&
      !prodOrderBatch &&
      !workCenter &&
      !sku &&
      !skuType &&
      !entryDate &&
      !entryTime &&
      !exitDate &&
      !exitTime
    ) {
      continue;
    }

    parsedRows.push({
      custId,
      prodOrderBatch,
      workCenter,
      sku,
      skuType,
      entryDate,
      entryTime,
      exitDate,
      exitTime,
    });
  }

  return parsedRows;
}

/**
 * Validates, computes timing and aggregations for a list of raw transaction rows
 */
export async function validateAndProcessTransactions(
  rawRows: RawTransactionRow[]
): Promise<ValidationResult> {
  // Pre-fetch all Customer Master File CUST IDs for fast lookup
  const masterCustomers = await prisma.customerMasterFile.findMany({
    select: { custId: true, custName: true },
  });
  const validCustIds = new Set(masterCustomers.map((c) => c.custId.toUpperCase().trim()));

  // Pre-fetch all Process Master File configurations for timing lookup
  const processMasterFiles = await prisma.processMasterFile.findMany();
  
  // Map of `${custId}_${skuType}` -> { totalCycleTime, cycleTimesMap }
  const processConfigMap = new Map<
    string,
    { totalCycleTime: number | null; cycleTimes: Record<string, number | null> }
  >();

  processMasterFiles.forEach((pm) => {
    let ctMap: Record<string, number | null> = {};
    try {
      if (pm.cycleTimes) {
        ctMap = typeof pm.cycleTimes === 'string' ? JSON.parse(pm.cycleTimes) : pm.cycleTimes;
      }
    } catch {
      ctMap = {};
    }

    const key = `${pm.custId.toUpperCase().trim()}_${normalizeSkuType(pm.skuType).toUpperCase()}`;
    processConfigMap.set(key, {
      totalCycleTime: pm.totalCycleTime,
      cycleTimes: ctMap,
    });
  });

  const processedRows: ProcessedTransactionRow[] = [];
  let validCount = 0;
  let invalidCount = 0;

  for (let i = 0; i < rawRows.length; i++) {
    const raw = rawRows[i];
    const rowNum = i + 1;

    const rawCustId = (raw.custId || '').trim();
    const rawProdOrderBatch = (raw.prodOrderBatch || '').trim();
    const rawWorkCenter = (raw.workCenter || '').trim();
    const rawSku = (raw.sku || '').trim();
    const rawSkuType = (raw.skuType || '').trim();
    const rawEntryDate = (raw.entryDate || '').trim();
    const rawEntryTime = (raw.entryTime || '').trim();
    const rawExitDate = (raw.exitDate || '').trim();
    const rawExitTime = (raw.exitTime || '').trim();

    const errors: string[] = [];

    // 1. Validate CUST ID
    if (!rawCustId) {
      errors.push('Missing CUST ID');
    } else if (!validCustIds.has(rawCustId.toUpperCase())) {
      errors.push(`CUST ID "${rawCustId}" does not exist in Master File`);
    }

    // 2. Validate & Extract Prod Order - Batch
    const poExtract = extractProdOrderAndBatch(rawProdOrderBatch);
    let prodOrder = '';
    let batch = '';
    if (!rawProdOrderBatch) {
      errors.push('Missing Prod Order - Batch');
    } else if (!poExtract) {
      errors.push(`Invalid Prod Order - Batch "${rawProdOrderBatch}" (Expected 7-digit PO + 3-digit Batch)`);
    } else {
      prodOrder = poExtract.prodOrder;
      batch = poExtract.batch;
    }

    // 3. Validate Work Center
    const normWC = normalizeWorkCenter(rawWorkCenter);
    if (!rawWorkCenter) {
      errors.push('Missing Work Center');
    } else if (!normWC) {
      errors.push(`Unrecognized Work Center "${rawWorkCenter}"`);
    }

    // 4. Validate SKU Type
    const normSkuType = normalizeSkuType(rawSkuType);
    if (!rawSkuType) {
      errors.push('Missing SKU Type');
    }

    // 5. Validate Timestamps & Calculate Actual Process Time
    const entryDateObj = parseCombinedTimestamp(rawEntryDate, rawEntryTime);
    const exitDateObj = parseCombinedTimestamp(rawExitDate, rawExitTime);

    let actualProcessTime = 0;
    let entryTimestampStr: string | null = null;
    let exitTimestampStr: string | null = null;

    if (!rawEntryDate || !rawEntryTime || !entryDateObj) {
      errors.push(`Invalid Entry Date/Time ("${rawEntryDate}" "${rawEntryTime}")`);
    } else {
      entryTimestampStr = entryDateObj.toISOString();
    }

    if (!rawExitDate || !rawExitTime || !exitDateObj) {
      errors.push(`Invalid Exit Date/Time ("${rawExitDate}" "${rawExitTime}")`);
    } else {
      exitTimestampStr = exitDateObj.toISOString();
    }

    if (entryDateObj && exitDateObj) {
      if (exitDateObj.getTime() < entryDateObj.getTime()) {
        errors.push('Exit timestamp is earlier than Entry timestamp');
      } else {
        const diffHours = (exitDateObj.getTime() - entryDateObj.getTime()) / (1000 * 60 * 60);
        actualProcessTime = Math.round(diffHours * 100) / 100;
      }
    }

    // 6. Expected Cycle Time Lookup from Process Master File
    let expectedCycleTime: number | null = null;
    if (rawCustId && normSkuType && normWC) {
      const configKey = `${rawCustId.toUpperCase()}_${normSkuType.toUpperCase()}`;
      const config = processConfigMap.get(configKey);
      if (config && config.cycleTimes) {
        // Look up by full label (e.g. "01 - WAXINJET") or process name (e.g. "WAXINJET")
        const val =
          config.cycleTimes[normWC.label] ??
          config.cycleTimes[normWC.name] ??
          config.cycleTimes[rawWorkCenter.toUpperCase()];
        if (val !== undefined && val !== null && !isNaN(Number(val))) {
          expectedCycleTime = Number(val);
        }
      }
    }

    // 7. Process-Level Status & Delay Calculation
    let delayHours = 0;
    let processStatus: 'NORMAL' | 'FLAG' = 'NORMAL';

    // Only compute delay and status for valid rows
    const isValid = errors.length === 0;

    if (isValid) {
      validCount++;
      if (expectedCycleTime !== null) {
        if (actualProcessTime > expectedCycleTime) {
          delayHours = Math.round((actualProcessTime - expectedCycleTime) * 100) / 100;
          processStatus = 'FLAG';
        } else {
          delayHours = 0;
          processStatus = 'NORMAL';
        }
      }
    } else {
      invalidCount++;
      processStatus = 'NORMAL';
      delayHours = 0;
    }

    processedRows.push({
      rowNumber: rowNum,
      rawCustId,
      rawProdOrderBatch,
      rawWorkCenter,
      rawSku,
      rawSkuType,
      rawEntryDate,
      rawEntryTime,
      rawExitDate,
      rawExitTime,
      prodOrder,
      batch,
      entryTimestamp: entryTimestampStr,
      exitTimestamp: exitTimestampStr,
      actualProcessTime: isValid ? actualProcessTime : 0,
      expectedCycleTime: isValid ? expectedCycleTime : null,
      delayHours: isValid ? delayHours : 0,
      processStatus,
      isValid,
      validationError: errors.length > 0 ? errors.join('; ') : null,
    });
  }

  // 8. Aggregate PO-Level Summaries (ONLY FOR VALID ROWS)
  const poMap = new Map<
    string,
    {
      prodOrder: string;
      custId: string;
      sku: string;
      skuType: string;
      batches: Set<string>;
      totalActualTime: number;
      rowCount: number;
    }
  >();

  processedRows.forEach((row) => {
    // Only include valid rows in PO summaries calculations
    if (row.isValid && row.prodOrder) {
      const existing = poMap.get(row.prodOrder);
      if (!existing) {
        poMap.set(row.prodOrder, {
          prodOrder: row.prodOrder,
          custId: row.rawCustId,
          sku: row.rawSku,
          skuType: normalizeSkuType(row.rawSkuType),
          batches: new Set(row.batch ? [row.batch] : []),
          totalActualTime: row.actualProcessTime,
          rowCount: 1,
        });
      } else {
        if (row.batch) existing.batches.add(row.batch);
        existing.totalActualTime = Math.round((existing.totalActualTime + row.actualProcessTime) * 100) / 100;
        existing.rowCount++;
      }
    }
  });

  const poSummaries: ProductionOrderSummaryData[] = [];
  poMap.forEach((po) => {
    const configKey = `${po.custId.toUpperCase()}_${po.skuType.toUpperCase()}`;
    const config = processConfigMap.get(configKey);
    const configuredTotalCT = config ? config.totalCycleTime : null;

    let totalDelay = 0;
    let poStatus: 'NORMAL' | 'FLAG' = 'NORMAL';

    if (configuredTotalCT !== null && configuredTotalCT !== undefined) {
      if (po.totalActualTime > configuredTotalCT) {
        totalDelay = Math.round((po.totalActualTime - configuredTotalCT) * 100) / 100;
        poStatus = 'FLAG';
      } else {
        totalDelay = 0;
        poStatus = 'NORMAL';
      }
    }

    poSummaries.push({
      prodOrder: po.prodOrder,
      custId: po.custId,
      sku: po.sku,
      skuType: po.skuType,
      numberOfBatches: po.batches.size,
      batchesList: Array.from(po.batches).sort(),
      totalActualTime: po.totalActualTime,
      configuredTotalCT: configuredTotalCT ?? null,
      totalDelay,
      poStatus,
      rowCount: po.rowCount,
    });
  });

  // Sort PO summaries
  poSummaries.sort((a, b) => a.prodOrder.localeCompare(b.prodOrder));

  return {
    totalRows: rawRows.length,
    validRows: validCount,
    invalidRows: invalidCount,
    rows: processedRows,
    poSummaries,
  };
}
