import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  ProcessedTransactionRow,
  ProductionOrderSummaryData,
} from '@/lib/transaction-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileName, rows, poSummaries } = body as {
      fileName: string;
      rows: ProcessedTransactionRow[];
      poSummaries: ProductionOrderSummaryData[];
    };

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: 'No transaction records provided for submission.' },
        { status: 400 }
      );
    }

    // Submission Rule: If any row is invalid, reject entire submission
    const invalidRows = rows.filter((r) => !r.isValid);
    if (invalidRows.length > 0) {
      return NextResponse.json(
        {
          error: `Cannot submit dataset containing ${invalidRows.length} invalid record(s). Please resolve all validation errors in the source dataset and re-upload.`,
          invalidCount: invalidRows.length,
        },
        { status: 400 }
      );
    }

    // Save transaction batch, records, and PO summaries in an atomic database transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create Upload Batch
      const batch = await tx.transactionUploadBatch.create({
        data: {
          fileName: fileName || 'Uploaded_Dataset.csv',
          totalRows: rows.length,
          validRows: rows.length,
          invalidRows: 0,
          status: 'SUBMITTED',
        },
      });

      // 2. Create Transaction Records (Preserving all raw and derived fields)
      const transactionData = rows.map((r) => ({
        uploadBatchId: batch.id,
        rawCustId: r.rawCustId,
        rawProdOrderBatch: r.rawProdOrderBatch,
        rawWorkCenter: r.rawWorkCenter,
        rawSku: r.rawSku,
        rawSkuType: r.rawSkuType,
        rawEntryDate: r.rawEntryDate,
        rawEntryTime: r.rawEntryTime,
        rawExitDate: r.rawExitDate,
        rawExitTime: r.rawExitTime,
        prodOrder: r.prodOrder || null,
        batch: r.batch || null,
        entryTimestamp: r.entryTimestamp ? new Date(r.entryTimestamp) : null,
        exitTimestamp: r.exitTimestamp ? new Date(r.exitTimestamp) : null,
        actualProcessTime: r.actualProcessTime,
        expectedCycleTime: r.expectedCycleTime,
        delayHours: r.delayHours,
        processStatus: r.processStatus,
        isValid: r.isValid,
        validationError: r.validationError,
      }));

      await tx.transactionMasterFile.createMany({
        data: transactionData,
      });

      // 3. Create PO Summaries
      if (poSummaries && poSummaries.length > 0) {
        const poData = poSummaries.map((po) => ({
          uploadBatchId: batch.id,
          prodOrder: po.prodOrder,
          custId: po.custId,
          sku: po.sku || null,
          skuType: po.skuType,
          numberOfBatches: po.numberOfBatches,
          batchesList: JSON.stringify(po.batchesList),
          totalActualTime: po.totalActualTime,
          configuredTotalCT: po.configuredTotalCT,
          totalDelay: po.totalDelay,
          poStatus: po.poStatus,
        }));

        await tx.productionOrderSummary.createMany({
          data: poData,
        });
      }

      return batch;
    });

    return NextResponse.json(
      {
        message: 'Transaction Master File dataset submitted and saved successfully.',
        uploadBatchId: result.id,
        totalRows: result.totalRows,
        validRows: result.validRows,
        invalidRows: result.invalidRows,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Transaction submission error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit Transaction Master File records' },
      { status: 500 }
    );
  }
}
