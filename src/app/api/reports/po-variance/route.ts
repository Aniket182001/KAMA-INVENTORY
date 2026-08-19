import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { normalizeSkuType, normalizeWorkCenter } from '@/lib/transaction-engine';

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

function buildReportForPOTransactions(
  prodOrder: string,
  poTxs: any[],
  customer: any | null,
  processConfig: any | null
): SinglePOReport {
  const primaryRow = poTxs[0];
  const rawCustId = (primaryRow.rawCustId || '').trim();
  const rawSkuType = (primaryRow.rawSkuType || '').trim();
  const normalizedSkuType = normalizeSkuType(rawSkuType);
  const sku = primaryRow.rawSku || '';

  let configuredProcesses: string[] = [];
  let cycleTimesMap: Record<string, number | null> = {};
  let standardSetTime: number | null = null;

  if (processConfig) {
    try {
      configuredProcesses =
        typeof processConfig.processes === 'string'
          ? JSON.parse(processConfig.processes)
          : processConfig.processes;
    } catch {
      configuredProcesses = [];
    }

    try {
      cycleTimesMap =
        typeof processConfig.cycleTimes === 'string'
          ? JSON.parse(processConfig.cycleTimes)
          : processConfig.cycleTimes;
    } catch {
      cycleTimesMap = {};
    }

    standardSetTime = processConfig.totalCycleTime ?? null;
  }

  // Group by Production Batch (e.g. "001", "002")
  const batchMap = new Map<string, any[]>();
  poTxs.forEach((tx) => {
    const b = tx.batch || '001';
    if (!batchMap.has(b)) {
      batchMap.set(b, []);
    }
    batchMap.get(b)!.push(tx);
  });

  const sortedBatchNumbers = Array.from(batchMap.keys()).sort();

  let totalPoActualTime = 0;
  let totalMissedCount = 0;
  let totalDelayedCount = 0;

  const batchesTracking = sortedBatchNumbers.map((batchNum) => {
    const batchTxs = batchMap.get(batchNum) || [];
    let batchActualTime = 0;

    const processTrackingList: ProcessTrackingItem[] = configuredProcesses.map((procLabel) => {
      const normConfigured = normalizeWorkCenter(procLabel);
      const configuredName = normConfigured ? normConfigured.name.toUpperCase() : procLabel.toUpperCase();
      const configuredStandardHours = cycleTimesMap[procLabel] ?? null;

      // Match against transactions in this batch
      const matchedTx = batchTxs.find((tx) => {
        const rawWC = (tx.rawWorkCenter || '').trim().toUpperCase();
        const normWC = normalizeWorkCenter(rawWC);
        const wcName = normWC ? normWC.name.toUpperCase() : rawWC;
        return wcName === configuredName || rawWC === configuredName || tx.rawWorkCenter === procLabel;
      });

      if (matchedTx) {
        const actualTime = matchedTx.actualProcessTime ?? 0;
        batchActualTime = Math.round((batchActualTime + actualTime) * 100) / 100;

        let delayHours = 0;
        let status: 'NORMAL' | 'FLAG' = 'NORMAL';

        if (configuredStandardHours !== null) {
          if (actualTime > configuredStandardHours) {
            delayHours = Math.round((actualTime - configuredStandardHours) * 100) / 100;
            status = 'FLAG';
            totalDelayedCount++;
          }
        }

        return {
          processLabel: procLabel,
          processName: normConfigured ? normConfigured.name : procLabel,
          status,
          isMissed: false,
          standardHours: configuredStandardHours,
          actualHours: actualTime,
          delayHours: delayHours,
          entryTimestamp: matchedTx.entryTimestamp ? matchedTx.entryTimestamp.toISOString() : null,
          exitTimestamp: matchedTx.exitTimestamp ? matchedTx.exitTimestamp.toISOString() : null,
          rawEntryDate: matchedTx.rawEntryDate,
          rawEntryTime: matchedTx.rawEntryTime,
          rawExitDate: matchedTx.rawExitDate,
          rawExitTime: matchedTx.rawExitTime,
        };
      } else {
        totalMissedCount++;
        return {
          processLabel: procLabel,
          processName: normConfigured ? normConfigured.name : procLabel,
          status: 'MISSED' as const,
          isMissed: true,
          standardHours: configuredStandardHours,
          actualHours: null,
          delayHours: null,
          entryTimestamp: null,
          exitTimestamp: null,
          rawEntryDate: null,
          rawEntryTime: null,
          rawExitDate: null,
          rawExitTime: null,
        };
      }
    });

    totalPoActualTime = Math.round((totalPoActualTime + batchActualTime) * 100) / 100;

    return {
      batchNumber: batchNum,
      batchActualTime: batchActualTime,
      processes: processTrackingList,
    };
  });

  // PO-Level Time Comparison
  let poTotalDelay = 0;
  let poStatus: 'NORMAL' | 'FLAG' = 'NORMAL';

  if (standardSetTime !== null) {
    if (totalPoActualTime > standardSetTime) {
      poTotalDelay = Math.round((totalPoActualTime - standardSetTime) * 100) / 100;
      poStatus = 'FLAG';
    }
  }

  return {
    basicInfo: {
      prodOrder,
      custId: rawCustId,
      custName: customer ? customer.custName : rawCustId,
      sku: sku,
      skuType: rawSkuType,
      normalizedSkuType,
    },
    summary: {
      batches: sortedBatchNumbers,
      numberOfBatches: sortedBatchNumbers.length,
      standardSetTime: standardSetTime,
      totalActualTime: totalPoActualTime,
      totalDelay: poTotalDelay,
      poStatus,
      hasProcessConfig: !!processConfig,
      missedProcessesCount: totalMissedCount,
      delayedProcessesCount: totalDelayedCount,
    },
    batches: batchesTracking,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const prodOrderQuery = searchParams.get('prodOrder')?.trim() || '';
    const custIdQuery = searchParams.get('custId')?.trim() || '';
    const skuTypeQuery = searchParams.get('skuType')?.trim() || '';

    // If no search parameters at all, return list of available PO summaries
    if (!prodOrderQuery && !custIdQuery && !skuTypeQuery) {
      const summaries = await prisma.productionOrderSummary.findMany({
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({
        data: summaries.map((s) => ({
          prodOrder: s.prodOrder,
          custId: s.custId,
          sku: s.sku,
          skuType: s.skuType,
          numberOfBatches: s.numberOfBatches,
          batchesList: s.batchesList ? JSON.parse(s.batchesList) : [],
          totalActualTime: s.totalActualTime,
          configuredTotalCT: s.configuredTotalCT,
          totalDelay: s.totalDelay,
          poStatus: s.poStatus,
          createdAt: s.createdAt,
        })),
      });
    }

    // Build filter for transactions
    const whereClause: any = {
      isValid: true,
    };

    if (prodOrderQuery) {
      whereClause.prodOrder = prodOrderQuery;
    }

    if (custIdQuery) {
      whereClause.rawCustId = {
        contains: custIdQuery,
      };
    }

    let transactions = await prisma.transactionMasterFile.findMany({
      where: whereClause,
      orderBy: [
        { prodOrder: 'asc' },
        { batch: 'asc' },
        { entryTimestamp: 'asc' },
        { createdAt: 'asc' },
      ],
    });

    // Filter by SKU Type if specified
    if (skuTypeQuery && transactions.length > 0) {
      const targetNorm = normalizeSkuType(skuTypeQuery).toUpperCase();
      transactions = transactions.filter(
        (t) => normalizeSkuType(t.rawSkuType || '').toUpperCase() === targetNorm
      );
    }

    if (transactions.length === 0) {
      return NextResponse.json(
        {
          error: `No transaction records found matching${
            prodOrderQuery ? ` Production Order "${prodOrderQuery}"` : ''
          }${custIdQuery ? ` CUST ID "${custIdQuery}"` : ''}${
            skuTypeQuery ? ` and SKU Type "${skuTypeQuery}"` : ''
          }.`,
        },
        { status: 404 }
      );
    }

    // Resolve Customer Information
    const primaryCustId = (transactions[0].rawCustId || '').trim();
    const customer = await prisma.customerMasterFile.findFirst({
      where: { custId: primaryCustId },
    });

    // Resolve Process Master Configuration for (CUST ID, SKU Type)
    const allProcessConfigs = await prisma.processMasterFile.findMany({
      where: { custId: primaryCustId },
    });

    const targetSkuTypeNorm = skuTypeQuery
      ? normalizeSkuType(skuTypeQuery).toUpperCase()
      : normalizeSkuType(transactions[0].rawSkuType || '').toUpperCase();

    const processConfig = allProcessConfigs.find(
      (pc) => normalizeSkuType(pc.skuType).toUpperCase() === targetSkuTypeNorm
    );

    // Group transactions by Production Order (prodOrder)
    const poGroupMap = new Map<string, any[]>();
    transactions.forEach((tx) => {
      const po = tx.prodOrder || 'UNKNOWN';
      if (!poGroupMap.has(po)) {
        poGroupMap.set(po, []);
      }
      poGroupMap.get(po)!.push(tx);
    });

    const sortedPOs = Array.from(poGroupMap.keys()).sort();
    const reports: SinglePOReport[] = sortedPOs.map((po) =>
      buildReportForPOTransactions(po, poGroupMap.get(po)!, customer, processConfig)
    );

    return NextResponse.json({
      reports,
      // For backwards compatibility with single PO consumers
      basicInfo: reports[0].basicInfo,
      summary: reports[0].summary,
      batches: reports[0].batches,
    });
  } catch (error: any) {
    console.error('PO Variance Report error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate Production Order variance report' },
      { status: 500 }
    );
  }
}
