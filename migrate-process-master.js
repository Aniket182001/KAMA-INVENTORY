const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'master.db'));

db.exec(`
  DROP TABLE IF EXISTS process_master_files;
  CREATE TABLE process_master_files (
    id TEXT PRIMARY KEY,
    custId TEXT NOT NULL,
    skuType TEXT NOT NULL,
    processes TEXT NOT NULL,
    cycleTimes TEXT NOT NULL,
    totalCycleTime REAL DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_cust_sku UNIQUE (custId, skuType)
  );
  CREATE INDEX IF NOT EXISTS idx_process_master_custId ON process_master_files(custId);
`);

console.log('Successfully created process_master_files table.');
const tableInfo = db.pragma('table_info(process_master_files)');
console.log('Columns:', tableInfo);
