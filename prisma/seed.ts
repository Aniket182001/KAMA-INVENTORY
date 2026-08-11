// ==============================================
// KAMA Production Monitor - Database Seed
// ==============================================
// Seeds the verified KAMA work-centre master data.
// Source: KAMA-supplied work-centre terminology.
// ==============================================

import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../src/generated/prisma';

const url = process.env.DATABASE_URL || 'file:./dev.db';
const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter });

// Verified KAMA work centres from supplied source data.
const KAMA_WORK_CENTRES = [
  { processCode: 'OpnBal', processName: 'Opening Balance', department: 'Opening', defaultSequence: 1 },
  { processCode: 'WAXINJET', processName: 'Wax Injection', department: 'Wax', defaultSequence: 2 },
  { processCode: 'FKIT', processName: 'Full Kit', department: 'Wax', defaultSequence: 3 },
  { processCode: 'WSFSK', processName: 'Wax Setting FSK', department: 'Wax', defaultSequence: 4 },
  { processCode: 'WSET', processName: 'Wax Setting', department: 'Wax', defaultSequence: 5 },
  { processCode: 'WAXTREE', processName: 'Wax Tree', department: 'Wax', defaultSequence: 6 },
  { processCode: 'CASTQC', processName: 'Casting QC', department: 'Casting', defaultSequence: 7 },
  { processCode: 'CASTING', processName: 'Casting', department: 'Casting', defaultSequence: 8 },
  { processCode: 'SINTER', processName: 'Sinter', department: 'Casting', defaultSequence: 9 },
  { processCode: 'LETHING', processName: 'Lettering', department: 'Machining', defaultSequence: 10 },
  { processCode: 'CNCMACH', processName: 'CNC Machining', department: 'Machining', defaultSequence: 11 },
  { processCode: 'CNCBLANK', processName: 'CNC Blank', department: 'Machining', defaultSequence: 12 },
  { processCode: 'GRINDING', processName: 'Grinding', department: 'Finishing', defaultSequence: 13 },
  { processCode: 'BUFFING', processName: 'Buffing', department: 'Finishing', defaultSequence: 14 },
  { processCode: 'SLD', processName: 'SLD', department: 'Finishing', defaultSequence: 15 },
  { processCode: 'OTEC', processName: 'OTEC', department: 'Finishing', defaultSequence: 16 },
  { processCode: 'HISPANA', processName: 'Hispana', department: 'Finishing', defaultSequence: 17 },
  { processCode: 'WSFIN', processName: 'Wax Setting Finishing', department: 'Setting', defaultSequence: 18 },
  { processCode: 'PRP', processName: 'PRP', department: 'Setting', defaultSequence: 19 },
  { processCode: 'FSK', processName: 'FSK', department: 'Setting', defaultSequence: 20 },
  { processCode: 'FSLD', processName: 'FSLD', department: 'Setting', defaultSequence: 21 },
  { processCode: 'MSET', processName: 'Metal Setting', department: 'Setting', defaultSequence: 22 },
  { processCode: 'POL', processName: 'Polishing', department: 'Finishing', defaultSequence: 23 },
  { processCode: 'SYTC', processName: 'SYTC', department: 'Finishing', defaultSequence: 24 },
  { processCode: 'RHODIUM', processName: 'Rhodium', department: 'Plating', defaultSequence: 25 },
  { processCode: 'FINALQC', processName: 'Final QC', department: 'Quality', defaultSequence: 26 },
  { processCode: 'CERT', processName: 'Certification', department: 'Certification', defaultSequence: 27 },
  { processCode: 'CERTCARD', processName: 'Certification Card', department: 'Certification', defaultSequence: 28 },
  { processCode: 'CERTQC', processName: 'Certification QC', department: 'Certification', defaultSequence: 29 },
  { processCode: 'RFD', processName: 'Ready for Dispatch', department: 'Dispatch', defaultSequence: 30 },
];

async function main() {
  console.log('🌱 Seeding KAMA work-centre master data...\n');

  let created = 0;
  let skipped = 0;

  for (const wc of KAMA_WORK_CENTRES) {
    const existing = await prisma.process.findUnique({
      where: { processCode: wc.processCode },
    });

    if (existing) {
      console.log(`  ⏭  ${wc.processCode} — already exists, skipping`);
      skipped++;
      continue;
    }

    await prisma.process.create({
      data: {
        processCode: wc.processCode,
        processName: wc.processName,
        department: wc.department,
        defaultSequence: wc.defaultSequence,
        isActive: true,
      },
    });

    console.log(`  ✅ ${wc.processCode} — ${wc.processName} (${wc.department})`);
    created++;
  }

  console.log(`\n🏁 Seed complete: ${created} created, ${skipped} skipped.`);
  console.log(`   Total work centres in database: ${await prisma.process.count()}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
