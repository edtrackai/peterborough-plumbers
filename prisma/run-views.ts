// Run once to create all DB views
// Command: npx tsx prisma/run-views.ts

import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()

async function main() {
  const sql = readFileSync(join(__dirname, 'create-views.sql'), 'utf-8')

  // Split on DROP VIEW / CREATE VIEW boundaries to run each statement separately
  const statements = sql
    .split(/;\s*\n/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'))

  for (const stmt of statements) {
    try {
      await prisma.$executeRawUnsafe(stmt)
      const match = stmt.match(/VIEW\s+(\w+)/i)
      if (match) console.log(`✅  ${match[1]}`)
    } catch (err: unknown) {
      const e = err as { message?: string }
      console.error(`❌  Error: ${e.message}`)
    }
  }

  console.log('\nAll views created. Add view blocks to schema.prisma and run: npx prisma generate')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
