import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const [
      totalCustomers,
      totalSkus,
      totalProcesses,
      totalRejections,
      recentCustomers,
      recentSkus,
      recentRejections,
    ] = await Promise.all([
      prisma.customer.count({ where: { isActive: true } }),
      prisma.sku.count({ where: { isActive: true } }),
      prisma.process.count({ where: { isActive: true } }),
      prisma.rejection.count(),
      prisma.customer.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      prisma.sku.findMany({
        where: { isActive: true },
        include: { customer: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      prisma.rejection.findMany({
        include: { customer: true, sku: true },
        orderBy: { rejectionDate: 'desc' },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      data: {
        counts: {
          customers: totalCustomers,
          skus: totalSkus,
          processes: totalProcesses,
          rejections: totalRejections,
        },
        recent: {
          customers: recentCustomers,
          skus: recentSkus,
          rejections: recentRejections,
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
