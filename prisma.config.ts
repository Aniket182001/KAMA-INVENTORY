// ==============================================
// KAMA Production Monitor - Prisma Configuration
// ==============================================
// Prisma v7 configuration file.
// Database URL is configured here, not in schema.prisma.
// ==============================================

import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'npx tsx prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
