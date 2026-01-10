'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/store/use-cart'
import { toast } from 'sonner'
import { useState } from 'react'

interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  comparePrice?: number | null
  images: Array<{ url: string; alt?: string | null }>
  category: string
  rating?: number | null
  reviewCount?: number
  stock: number
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  comparePrice,
  images,
  category,
  rating,
  reviewCount,
  stock,
}: ProductCardProps) {
  const { addItem } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discount = comparePrice ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id,
      name,
      price,
      quantity: 1,
      image: images[0]?.url || '/placeholder.png',
      slug,
    })
    toast.success('Added to cart!', {
      description: `${name} has been added to your cart.`,
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  const displayRating = rating || 0
  const displayImage = images[0]?.url || '/placeholder.png'

  return (
    <Link href={`/product/${slug}`}>
      <Card
        className="group overflow-hidden transition-all hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          {/* Image container */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={displayImage}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Badges */}
            <div className="absolute top-2 left-2 flex gap-2">
              {discount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  -{discount}% OFF
                </Badge>
              )}
              {stock === 0 && (
                <Badge variant="secondary" className="text-xs">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Quick actions */}
            <div
              className={`absolute top-2 right-2 flex flex-col gap-2 transition-all duration-300 ${
                isHovered ? 'translate-x-0' : 'translate-x-10'
              }`}
            >
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full"
                onClick={handleWishlist}
              >
                <Heart
                  className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                />
              </Button>
            </div>

            {/* Add to cart button overlay */}
            {isHovered && stock > 0 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 transition-opacity">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="p-4">
            {/* Category */}
            <p className="text-xs text-muted-foreground mb-1">{category}</p>

            {/* Title */}
            <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
              {name}
            </h3>

            {/* Rating */}
            {displayRating > 0 && (
              <div className="flex items-center gap-1 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(displayRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                {reviewCount && (
                  <span className="text-xs text-muted-foreground">
                    ({reviewCount})
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">${price.toFixed(2)}</span>
              {comparePrice && comparePrice > price && (
                <span className="text-sm text-muted-foreground line-through">
                  ${comparePrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
