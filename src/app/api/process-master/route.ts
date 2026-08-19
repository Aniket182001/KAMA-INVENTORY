import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { processMasterFileSchema } from '@/lib/validators';

// GET /api/process-master - List all records or filter by custId / skuType
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const searchCustId = searchParams.get('custId');
    const searchSkuType = searchParams.get('skuType');

    const where: Record<string, any> = {};
    if (searchCustId) {
      where.custId = searchCustId.trim().toUpperCase();
    }
    if (searchSkuType) {
      where.skuType = searchSkuType.trim();
    }

    const records = await prisma.processMasterFile.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
    });

    // Parse JSON fields for client convenience
    const formatted = records.map((rec) => {
      let parsedProcesses: string[] = [];
      let parsedCycleTimes: Record<string, number | string | null> = {};
      try {
        parsedProcesses = JSON.parse(rec.processes);
      } catch (e) {}
      try {
        parsedCycleTimes = JSON.parse(rec.cycleTimes);
      } catch (e) {}

      return {
        ...rec,
        processes: parsedProcesses,
        cycleTimes: parsedCycleTimes,
      };
    });

    return NextResponse.json({ success: true, data: formatted });
  } catch (error: any) {
    console.error('Error fetching process master records:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch process master records' },
      { status: 500 }
    );
  }
}

// POST /api/process-master - Create or update a Process Master File record
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = processMasterFileSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path.join('.');
        fieldErrors[field] = issue.message;
      });
      return NextResponse.json(
        { success: false, error: 'Validation failed', fieldErrors },
        { status: 400 }
      );
    }

    const { custId, skuType, processes, cycleTimes } = result.data;
    const normalizedCustId = custId.trim().toUpperCase();

    // 1. Verify that CUST ID exists in Master File (CustomerMasterFile)
    const masterCustomer = await prisma.customerMasterFile.findUnique({
      where: { custId: normalizedCustId },
    });

    if (!masterCustomer) {
      return NextResponse.json(
        {
          success: false,
          error: `CUST ID "${normalizedCustId}" does not exist in Master File. Please select a valid existing CUST ID.`,
          fieldErrors: {
            custId: `CUST ID "${normalizedCustId}" not found in Master File`,
          },
        },
        { status: 400 }
      );
    }

    // 2. Calculate Total Cycle Time from selected processes
    let totalCycleTime = 0;
    const cleanCycleTimes: Record<string, number | null> = {};

    processes.forEach((procLabel) => {
      const rawVal = cycleTimes[procLabel];
      if (rawVal !== undefined && rawVal !== null && rawVal !== '') {
        const numVal = parseFloat(String(rawVal));
        if (!isNaN(numVal) && numVal >= 0) {
          cleanCycleTimes[procLabel] = numVal;
          totalCycleTime += numVal;
        } else {
          cleanCycleTimes[procLabel] = null;
        }
      } else {
        cleanCycleTimes[procLabel] = null;
      }
    });

    // 3. Upsert record for (custId, skuType) combination
    const existing = await prisma.processMasterFile.findUnique({
      where: {
        custId_skuType: {
          custId: normalizedCustId,
          skuType,
        },
      },
    });

    let savedRecord;
    if (existing) {
      savedRecord = await prisma.processMasterFile.update({
        where: { id: existing.id },
        data: {
          processes: JSON.stringify(processes),
          cycleTimes: JSON.stringify(cleanCycleTimes),
          totalCycleTime,
        },
      });
    } else {
      savedRecord = await prisma.processMasterFile.create({
        data: {
          custId: normalizedCustId,
          skuType,
          processes: JSON.stringify(processes),
          cycleTimes: JSON.stringify(cleanCycleTimes),
          totalCycleTime,
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          ...savedRecord,
          processes,
          cycleTimes: cleanCycleTimes,
        },
      },
      { status: existing ? 200 : 201 }
    );
  } catch (error: any) {
    console.error('Error saving process master record:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to save process master record' },
      { status: 500 }
    );
  }
}
