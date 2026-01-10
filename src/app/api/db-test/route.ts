import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Get counts from database
    const categories = await prisma.category.count()
    const products = await prisma.product.count()
    const users = await prisma.user.count()
    
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
