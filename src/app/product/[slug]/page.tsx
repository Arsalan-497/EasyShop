'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useCart } from '@/store/use-cart'
import { toast } from 'sonner'

// Mock product data - will be replaced with API data
const mockProduct = {
  id: '1',
  name: 'Premium Wireless Headphones',
  slug: 'premium-wireless-headphones',
  description: 'Experience crystal-clear audio with our Premium Wireless Headphones. Featuring advanced noise cancellation technology, 40-hour battery life, and premium comfort padding for extended listening sessions. Perfect for music lovers, gamers, and professionals alike.',
  price: 149.99,
  comparePrice: 199.99,
  stock: 50,
  category: 'Electronics',
  rating: 4.5,
  reviewCount: 128,
  sku: 'WH-001',
  videoUrl: '/videos/product-demo.mp4',
  images: [
    { url: '/placeholder-products/headphones.jpg.svg', alt: 'Front view', position: 0 },
    { url: '/placeholder-products/headphones.jpg.svg', alt: 'Side view', position: 1 },
    { url: '/placeholder-products/headphones.jpg.svg', alt: 'Back view', position: 2 },
    { url: '/placeholder-products/headphones.jpg.svg', alt: 'Detail view', position: 3 },
  ],
  features: [
    '40-hour battery life',
    'Active noise cancellation',
    'Bluetooth 5.2 connectivity',
    'Premium memory foam ear cushions',
    'Foldable design for portability',
    'Built-in microphone',
  ],
  specifications: {
    'Driver Size': '40mm',
    'Frequency Response': '20Hz - 20kHz',
    'Bluetooth Version': '5.2',
    'Battery Life': '40 hours',
    'Charging Time': '2 hours',
    'Weight': '250g',
    'Connectivity': 'Bluetooth 5.2, 3.5mm AUX',
  },
}

const mockReviews = [
  {
    id: '1',
    user: { name: 'John D.', avatar: null },
    rating: 5,
    title: 'Excellent sound quality!',
    comment: 'These headphones exceeded my expectations. The sound is crystal clear and the noise cancellation works perfectly. Battery life is amazing too.',
    date: '2024-01-15',
    helpful: 24,
  },
  {
    id: '2',
    user: { name: 'Sarah M.', avatar: null },
    rating: 4,
    title: 'Great value for money',
    comment: 'Very comfortable for long listening sessions. The only minor issue is the carrying case could be better designed.',
    date: '2024-01-10',
    helpful: 18,
  },
  {
    id: '3',
    user: { name: 'Mike R.', avatar: null },
    rating: 5,
    title: 'Best headphones I\'ve owned',
    comment: 'I\'ve tried many headphones in this price range and these are by far the best. Highly recommend!',
    date: '2024-01-05',
    helpful: 15,
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const product = mockProduct // Will fetch from API based on params.slug
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0]?.url || '/placeholder.png',
      slug: product.slug,
    })
    toast.success('Added to cart!', {
      description: `${quantity} × ${product.name} has been added to your cart.`,
    })
  }

  const handleBuyNow = () => {
    handleAddToCart()
    // Navigate to checkout
    window.location.href = '/checkout'
  }

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-primary">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {/* Product images */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImage]?.url || '/placeholder.png'}
              alt={product.images[selectedImage]?.alt || product.name}
              fill
              className="object-cover"
            />

            {/* Image navigation */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-2 left-2 flex gap-2">
              {discount > 0 && (
                <Badge variant="destructive">-{discount}% OFF</Badge>
              )}
              {product.stock === 0 && (
                <Badge variant="secondary">Out of Stock</Badge>
              )}
            </div>

            {/* Video button */}
            {product.videoUrl && (
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-2 right-2"
              >
                <Play className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Thumbnail gallery */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={image.position}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-muted rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || ''}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.comparePrice && product.comparePrice > product.price && (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  ${product.comparePrice.toFixed(2)}
                </span>
                <Badge variant="destructive">Save ${product.comparePrice - product.price}</Badge>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground">{product.description}</p>

          {/* Features */}
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Quantity and actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              Buy Now
            </Button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-5 w-5 text-primary" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-5 w-5 text-primary" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="h-5 w-5 text-primary" />
              <span>30-Day Returns</span>
            </div>
          </div>

          <Separator />

          {/* Product details */}
          <div className="text-sm space-y-2">
            <div className="flex">
              <span className="w-32 text-muted-foreground">SKU:</span>
              <span>{product.sku}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-muted-foreground">Category:</span>
              <span>{product.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product details tabs */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">
            Reviews ({product.reviewCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex border-b pb-3 last:border-0">
                    <span className="w-48 font-medium">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            {/* Review summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{product.rating}</div>
                    <div className="flex items-center gap-1 my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {product.reviewCount} reviews
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-sm w-8">{star}★</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${Math.random() * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-8">
                          {Math.floor(Math.random() * 100)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews list */}
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          {review.user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{review.user.name}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <span className="text-xs">{review.helpful} helpful</span>
                      </Button>
                    </div>
                    <h4 className="font-medium mb-2">{review.title}</h4>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
