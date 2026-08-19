const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'master.db');
const db = new Database(dbPath);

console.log('Migrating Transaction Master File tables with uploadBatchId in master.db...');

// Drop existing tables to ensure clean schema with uploadBatchId
db.exec(`
  DROP TABLE IF EXISTS transaction_master_files;
  DROP TABLE IF EXISTS production_order_summaries;
  DROP TABLE IF EXISTS transaction_upload_batches;

  CREATE TABLE IF NOT EXISTS transaction_upload_batches (
    id TEXT PRIMARY KEY,
    fileName TEXT NOT NULL,
    totalRows INTEGER NOT NULL DEFAULT 0,
    validRows INTEGER NOT NULL DEFAULT 0,
    invalidRows INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'SUBMITTED',
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS transaction_master_files (
    id TEXT PRIMARY KEY,
    uploadBatchId TEXT NOT NULL,
    rawCustId TEXT,
    rawProdOrderBatch TEXT,
    rawWorkCenter TEXT,
    rawSku TEXT,
    rawSkuType TEXT,
    rawEntryDate TEXT,
    rawEntryTime TEXT,
    rawExitDate TEXT,
    rawExitTime TEXT,
    prodOrder TEXT,
    batch TEXT,
    entryTimestamp DATETIME,
    exitTimestamp DATETIME,
    actualProcessTime REAL,
    expectedCycleTime REAL,
    delayHours REAL DEFAULT 0,
    processStatus TEXT DEFAULT 'NORMAL',
    isValid INTEGER DEFAULT 1,
    validationError TEXT,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_trans_upload_batch ON transaction_master_files(uploadBatchId);
  CREATE INDEX IF NOT EXISTS idx_trans_prod_order ON transaction_master_files(prodOrder);
  CREATE INDEX IF NOT EXISTS idx_trans_cust_id ON transaction_master_files(rawCustId);

  CREATE TABLE IF NOT EXISTS production_order_summaries (
    id TEXT PRIMARY KEY,
    uploadBatchId TEXT NOT NULL,
    prodOrder TEXT NOT NULL,
    custId TEXT NOT NULL,
    sku TEXT,
    skuType TEXT NOT NULL,
    numberOfBatches INTEGER DEFAULT 1,
    batchesList TEXT,
    totalActualTime REAL DEFAULT 0,
    configuredTotalCT REAL,
    totalDelay REAL DEFAULT 0,
    poStatus TEXT DEFAULT 'NORMAL',
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_po_summary_upload_batch ON production_order_summaries(uploadBatchId);
  CREATE INDEX IF NOT EXISTS idx_po_summary_po ON production_order_summaries(prodOrder);
`);

console.log('Migration with uploadBatchId completed successfully.');
db.close();
