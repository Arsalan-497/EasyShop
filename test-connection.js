const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Testing database connection...')
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Connected to Neon PostgreSQL!')
    
    // Test basic query
    const count = await prisma.category.count()
    console.log(`✅ Database accessible. Categories count: ${count}`)
    
    // Try to create a test category
    const category = await prisma.category.create({
      data: {
        name: 'Test Category',
        slug: 'test-category-' + Date.now(),
        description: 'Test category from connection test'
      }
    })
    console.log(`✅ Created test category: ${category.name}`)
    
    await prisma.$disconnect()
    console.log('✅ All tests passed! Database is ready.')
  } catch (error) {
    console.error('❌ Database error:', error.message)
    process.exit(1)
  }
}

main()
