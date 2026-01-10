import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sort = searchParams.get('sort') || 'createdAt'
    const limit = parseInt(searchParams.get('limit') || '20')
    const page = parseInt(searchParams.get('page') || '1')
    const offset = (page - 1) * limit

    // Build where clause
    const where: any = {
      isActive: true,
    }

    if (category) {
      where.category = {
        slug: category,
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) {
        where.price.gte = parseFloat(minPrice)
      }
      if (maxPrice) {
        where.price.lte = parseFloat(maxPrice)
      }
    }

    // Build orderBy
    const orderBy: any = {}
    if (sort === 'price-low') {
      orderBy.price = 'asc'
    } else if (sort === 'price-high') {
      orderBy.price = 'desc'
    } else if (sort === 'rating') {
      orderBy.reviews = { _count: 'desc' }
    } else if (sort === 'name') {
      orderBy.name = 'asc'
    } else {
      orderBy.createdAt = 'desc'
    }

    // Fetch products with their images, category, and average rating
    const products = await db.product.findMany({
      where,
      orderBy,
      take: limit,
      skip: offset,
      include: {
        images: {
          orderBy: { position: 'asc' },
        },
        category: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    })

    // Calculate average rating and review count for each product
    const productsWithRating = products.map((product) => {
      const ratings = product.reviews.map((r) => r.rating)
      const avgRating = ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
        : null

      return {
        ...product,
        rating: avgRating,
        reviewCount: ratings.length,
      }
    })

    // Get total count for pagination
    const total = await db.product.count({ where })

    return NextResponse.json({
      products: productsWithRating,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
