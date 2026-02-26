import { db } from './db'

/**
 * Backward-compatible Prisma export.
 *
 * Prefer importing `db` from `@/lib/db` in new code.
 * This file exists to avoid breaking legacy imports of `@/lib/prisma`.
 */
export const prisma = db
export { db }
