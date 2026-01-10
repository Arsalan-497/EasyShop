'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Package, User, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AccountPage() {
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
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-muted-foreground">
            Manage your orders, profile, and preferences
          </p>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:max-w-md">
            <TabsTrigger value="orders">
              <Package className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="addresses">
              <MapPin className="h-4 w-4 mr-2" />
              Addresses
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-6">
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div>
                      <CardTitle className="text-lg">
                        Order #{order.id}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between pt-3 border-t">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-lg">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex gap-2 pt-3">
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {orders.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center space-y-6">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                      <Package className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                      <p className="text-muted-foreground mb-4">
                        You haven't placed any orders yet.
                      </p>
                      <Button asChild>
                        <Link href="/shop">
                          Start Shopping
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="mt-6">
            <Card>
              <CardContent className="p-12 text-center space-y-6">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <MapPin className="h-10 w-10 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">No addresses saved</h3>
                  <p className="text-muted-foreground mb-4">
                    Add a shipping address to speed up checkout.
                  </p>
                  <Button>Add New Address</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
