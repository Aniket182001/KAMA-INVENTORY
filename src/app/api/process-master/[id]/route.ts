import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { processMasterFileUpdateSchema } from '@/lib/validators';

// GET /api/process-master/[id] - Fetch single record
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const record = await prisma.processMasterFile.findUnique({
      where: { id },
    });

    if (!record) {
      return NextResponse.json(
        { success: false, error: `Process Master record with ID "${id}" not found` },
        { status: 404 }
      );
    }

    let parsedProcesses: string[] = [];
    let parsedCycleTimes: Record<string, number | string | null> = {};
    try {
      parsedProcesses = JSON.parse(record.processes);
    } catch (e) {}
    try {
      parsedCycleTimes = JSON.parse(record.cycleTimes);
    } catch (e) {}

    return NextResponse.json({
      success: true,
      data: {
        ...record,
        processes: parsedProcesses,
        cycleTimes: parsedCycleTimes,
      },
    });
  } catch (error: any) {
    console.error('Error fetching process master record:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch process master record' },
      { status: 500 }
    );
  }
}

// PUT /api/process-master/[id] - Update process master record
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const result = processMasterFileUpdateSchema.safeParse(body);
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

    const { skuType, processes, cycleTimes } = result.data;

    const existing = await prisma.processMasterFile.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Process Master record with ID "${id}" not found` },
        { status: 404 }
      );
    }

    // Calculate Total Cycle Time from selected processes
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

    const updated = await prisma.processMasterFile.update({
      where: { id },
      data: {
        skuType,
        processes: JSON.stringify(processes),
        cycleTimes: JSON.stringify(cleanCycleTimes),
        totalCycleTime,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...updated,
        processes,
        cycleTimes: cleanCycleTimes,
      },
    });
  } catch (error: any) {
    console.error('Error updating process master record:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update process master record' },
      { status: 500 }
    );
  }
}

// DELETE /api/process-master/[id] - Delete process master record
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.processMasterFile.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Process Master record with ID "${id}" not found` },
        { status: 404 }
      );
    }

    await prisma.processMasterFile.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Process Master record deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting process master record:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to delete process master record' },
      { status: 500 }
    );
  }
}
