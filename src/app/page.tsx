import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Truck, Shield, Headphones, Star, Package, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { ProductCard } from '@/components/products/product-card'

// Mock data - will be replaced with real data from database
const featuredProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    slug: 'premium-wireless-headphones',
    price: 149.99,
    comparePrice: 199.99,
    images: [{ url: '/placeholder-products/headphones.jpg.svg', alt: 'Wireless Headphones' }],
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 128,
    stock: 50,
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    slug: 'smart-watch-series-x',
    price: 299.99,
    comparePrice: 349.99,
    images: [{ url: '/placeholder-products/watch.jpg.svg', alt: 'Smart Watch' }],
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 245,
    stock: 30,
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    slug: 'ergonomic-office-chair',
    price: 399.99,
    comparePrice: null,
    images: [{ url: '/placeholder-products/chair.jpg.svg', alt: 'Office Chair' }],
    category: 'Furniture',
    rating: 4.6,
    reviewCount: 89,
    stock: 20,
  },
  {
    id: '4',
    name: 'Organic Cotton T-Shirt',
    slug: 'organic-cotton-tshirt',
    price: 29.99,
    comparePrice: 39.99,
    images: [{ url: '/placeholder-products/tshirt.jpg.svg', alt: 'Cotton T-Shirt' }],
    category: 'Clothing',
    rating: 4.3,
    reviewCount: 567,
    stock: 100,
  },
]

const categories = [
  { id: '1', name: 'Electronics', slug: 'electronics', image: '/placeholder-categories/electronics.jpg', count: 234 },
  { id: '2', name: 'Clothing', slug: 'clothing', image: '/placeholder-categories/clothing.jpg', count: 456 },
  { id: '3', name: 'Home & Garden', slug: 'home-garden', image: '/placeholder-categories/home.jpg', count: 189 },
  { id: '4', name: 'Sports', slug: 'sports', image: '/placeholder-categories/sports.jpg', count: 123 },
  { id: '5', name: 'Books', slug: 'books', image: '/placeholder-categories/books.jpg', count: 567 },
  { id: '6', name: 'Beauty', slug: 'beauty', image: '/placeholder-categories/beauty.jpg', count: 345 },
]

const features = [
  {
    icon: Package,
    title: 'Quality Products',
    description: 'We carefully curate our products to ensure you receive only the best quality items.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Get your orders delivered quickly with our efficient shipping network.',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: 'Shop with confidence knowing your transactions are protected with SSL encryption.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our customer support team is always ready to help you with any questions.',
  },
]

const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    text: 'Amazing shopping experience! The product quality exceeded my expectations and delivery was super fast.',
    image: '/placeholder-avatar-1.jpg',
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'Los Angeles, USA',
    rating: 5,
    text: 'EasyShop has become my go-to online store. Great prices, excellent customer service, and always reliable.',
    image: '/placeholder-avatar-2.jpg',
  },
  {
    id: '3',
    name: 'Emma Davis',
    location: 'Chicago, USA',
    rating: 5,
    text: 'I love the wide selection of products and how easy it is to find exactly what I need. Highly recommended!',
    image: '/placeholder-avatar-3.jpg',
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="text-sm">
              <TrendingUp className="w-3 h-3 mr-1" />
              New arrivals available
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              EasyShop – Shop Smart, Shop Easy
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover amazing products at unbeatable prices. Your trusted destination for quality shopping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/shop">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-none shadow-sm">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Handpicked products just for you</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/shop">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
            <p className="text-muted-foreground">Browse our wide range of categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted relative">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
                        <div className="text-center space-y-2">
                          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-lg">
                            <Package className="h-8 w-8 text-primary" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{category.count} products</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose EasyShop?</h2>
            <p className="text-lg text-muted-foreground">
              We're committed to providing you with the best shopping experience possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-none shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Package className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Quality Guaranteed</h3>
                <p className="text-muted-foreground">
                  Every product in our store is carefully selected and quality-checked to ensure you receive only the best.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Fast & Free Shipping</h3>
                <p className="text-muted-foreground">
                  Enjoy fast delivery on all orders. Get free shipping on orders over $50 with tracking included.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Secure Payments</h3>
                <p className="text-muted-foreground">
                  Shop with peace of mind knowing your payments are protected with industry-leading encryption technology.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Headphones className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">24/7 Customer Support</h3>
                <p className="text-muted-foreground">
                  Our dedicated support team is available around the clock to help you with any questions or concerns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of satisfied customers who shop with EasyShop
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-none shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary to-primary/80 border-none">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                Ready to Start Shopping?
              </h2>
              <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                Join thousands of happy customers and discover quality products at amazing prices.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/shop">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
