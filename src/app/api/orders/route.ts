import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      userId,
      addressId,
      items,
      paymentMethod,
      notes,
    } = body

    // Validate required fields
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Order items are required' },
        { status: 400 }
      )
    }

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity)
    }, 0)

    const shipping = subtotal > 50 ? 0 : 9.99
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    // Generate order number
    const orderNumber = `ES${Date.now().toString().slice(-8)}`

    // Create order
    const order = await db.order.create({
      data: {
        userId,
        orderNumber,
        addressId,
        subtotal,
        shipping,
        tax,
        discount: 0,
        total,
        status: 'PENDING',
        paymentMethod,
        paymentStatus: 'PENDING',
        notes,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        address: true,
        user: true,
      },
    })

    // Update product stock
    for (const item of items) {
      await db.product.update({
        where: { id: item.id },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      })
    }

    return NextResponse.json({
      success: true,
      order,
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
