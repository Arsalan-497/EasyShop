import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Target, Heart, Shield, Users, Globe, Award } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              About EasyShop
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Making online shopping easy, affordable, and reliable for everyone
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <div className="w-20 h-1 bg-primary mx-auto"></div>
            </div>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p>
                EasyShop was founded with a simple mission: to make online shopping accessible, affordable, and enjoyable for everyone. What started as a small idea has grown into a trusted platform that serves customers worldwide.
              </p>
              <p>
                We believe that shopping should be easy – no complicated processes, no hidden fees, no hassle. That's why we've built EasyShop from the ground up with the customer experience at the center of everything we do.
              </p>
              <p>
                From our carefully curated product selection to our dedicated customer support team, every aspect of EasyShop is designed to provide you with the best possible shopping experience. We partner with trusted suppliers and brands to bring you quality products at competitive prices.
              </p>
              <p>
                Today, EasyShop continues to grow and evolve, but our core values remain the same: quality, affordability, and exceptional customer service. We're not just building an online store – we're building a community of satisfied shoppers who trust us to deliver.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-16 md:py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8 text-center space-y-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide our customers with a seamless shopping experience by offering quality products at affordable prices, backed by exceptional customer service and secure transactions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8 text-center space-y-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become the world's most trusted and customer-centric e-commerce platform, making quality products accessible to everyone, everywhere.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Customer First</h3>
                <p className="text-muted-foreground">
                  Our customers are at the heart of every decision we make. Your satisfaction is our top priority.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Trust & Security</h3>
                <p className="text-muted-foreground">
                  We protect your data and transactions with industry-leading security measures.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Quality Products</h3>
                <p className="text-muted-foreground">
                  We carefully select and vet every product to ensure you receive only the best quality.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Community</h3>
                <p className="text-muted-foreground">
                  We're building more than a store – we're creating a community of satisfied customers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously improve and innovate to provide you with the best shopping experience.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Sustainability</h3>
                <p className="text-muted-foreground">
                  We're committed to sustainable practices and reducing our environmental footprint.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose EasyShop?</h2>
              <p className="text-lg text-muted-foreground">
                Here's what sets us apart from the rest
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: 'Wide Product Selection',
                  description: 'Browse thousands of products across multiple categories, all carefully curated for quality and value.',
                },
                {
                  title: 'Competitive Prices',
                  description: 'Enjoy great prices without compromising on quality. We regularly update our prices to give you the best deals.',
                },
                {
                  title: 'Fast & Reliable Shipping',
                  description: 'Get your orders quickly with our efficient shipping network. Free shipping on orders over $50.',
                },
                {
                  title: 'Secure Transactions',
                  description: 'Shop with confidence knowing your payments are protected with SSL encryption and secure payment gateways.',
                },
                {
                  title: 'Easy Returns',
                  description: 'Not satisfied? Return products within 30 days for a full refund. Hassle-free returns policy.',
                },
                {
                  title: '24/7 Customer Support',
                  description: 'Our dedicated support team is available around the clock to help you with any questions or concerns.',
                },
              ].map((item, index) => (
                <div key={index} className="bg-background p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary to-primary/80 border-none">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                Ready to Experience EasyShop?
              </h2>
              <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                Join thousands of satisfied customers and discover a better way to shop online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/shop">Start Shopping</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-background hover:bg-background/90" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
