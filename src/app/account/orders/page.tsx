'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Package } from 'lucide-react'

export default function OrdersPage() {
  // Mock orders data - will be replaced with API data
  const orders = [
    {
      id: 'ES12345678',
      date: '2024-01-15',
      status: 'Delivered',
      total: 249.99,
      items: [
        { name: 'Premium Wireless Headphones', quantity: 1, price: 149.99 },
        { name: 'Portable Bluetooth Speaker', quantity: 1, price: 89.99 },
      ],
    },
    {
      id: 'ES12345679',
      date: '2024-01-10',
      status: 'Processing',
      total: 299.99,
      items: [
        { name: 'Smart Watch Series X', quantity: 1, price: 299.99 },
      ],
    },
    {
      id: 'ES12345680',
      date: '2024-01-05',
      status: 'Shipped',
      total: 129.99,
      items: [
        { name: 'Running Shoes Pro', quantity: 1, price: 129.99 },
      ],
    },
    {
      id: 'ES12345681',
      date: '2023-12-28',
      status: 'Pending',
      total: 179.98,
      items: [
        { name: 'LED Desk Lamp', quantity: 2, price: 59.99 },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'default'
      case 'Processing':
        return 'secondary'
      case 'Shipped':
        return 'default'
      case 'Pending':
        return 'secondary'
      case 'Cancelled':
        return 'destructive'
      default:
        return 'default'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/account/profile"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Account
          </Link>
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            View and track all your orders
          </p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle className="text-lg">
                    Order #{order.id}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Placed on {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <Badge variant={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order items */}
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Order total */}
                  <div className="flex justify-between pt-3 border-t">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-3">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Track Order
                    </Button>
                    {order.status === 'Delivered' && (
                      <Button variant="outline" size="sm">
                        Buy Again
                      </Button>
                    )}
                    {(order.status === 'Pending' || order.status === 'Processing') && (
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {orders.length === 0 && (
            <Card>
              <CardContent className="p-16 text-center space-y-6">
                <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-muted mx-auto">
                  <Package className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
                  <p className="text-muted-foreground mb-6">
                    You haven't placed any orders yet. Start shopping to see your orders here.
                  </p>
                  <Button size="lg" asChild>
                    <Link href="/shop">
                      Start Shopping
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
