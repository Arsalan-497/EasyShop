import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Test database connection
    await db.$connect()
    
    // Get counts from database
    const categories = await db.category.count()
    const products = await db.product.count()
    const users = await db.user.count()
    
    return NextResponse.json({
      connected: true,
      timestamp: new Date().toISOString(),
      counts: {
        categories,
        products,
        users
      },
      message: '✅ Database connected successfully to Neon PostgreSQL!',
      note: 'Counts may be 0 if database is empty'
    })
  } catch (error: any) {
    return NextResponse.json({
      connected: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      help: 'Check DATABASE_URL environment variable in Vercel'
    }, { status: 500 })
  }
}
