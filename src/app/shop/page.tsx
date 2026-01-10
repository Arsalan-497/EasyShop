'use client'

import { useState, useMemo, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProductCard } from '@/components/products/product-card'
import { ProductFilters } from '@/components/products/product-filters'
import { SlidersHorizontal, Search, ChevronDown, Grid3X3, List } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useSearchParams } from 'next/navigation'

// Mock data - will be replaced with API data
const products = [
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
  {
    id: '5',
    name: 'Professional Laptop Backpack',
    slug: 'laptop-backpack',
    price: 79.99,
    comparePrice: null,
    images: [{ url: '/placeholder-products/backpack.jpg.svg', alt: 'Laptop Backpack' }],
    category: 'Accessories',
    rating: 4.7,
    reviewCount: 324,
    stock: 75,
  },
  {
    id: '6',
    name: 'LED Desk Lamp',
    slug: 'led-desk-lamp',
    price: 59.99,
    comparePrice: 79.99,
    images: [{ url: '/placeholder-products/lamp.jpg.svg', alt: 'LED Lamp' }],
    category: 'Home & Garden',
    rating: 4.4,
    reviewCount: 156,
    stock: 45,
  },
  {
    id: '7',
    name: 'Running Shoes Pro',
    slug: 'running-shoes-pro',
    price: 129.99,
    comparePrice: null,
    images: [{ url: '/placeholder-products/shoes.jpg.svg', alt: 'Running Shoes' }],
    category: 'Sports',
    rating: 4.9,
    reviewCount: 412,
    stock: 60,
  },
  {
    id: '8',
    name: 'Portable Bluetooth Speaker',
    slug: 'bluetooth-speaker',
    price: 89.99,
    comparePrice: 109.99,
    images: [{ url: '/placeholder-products/speaker.jpg.svg', alt: 'Bluetooth Speaker' }],
    category: 'Electronics',
    rating: 4.6,
    reviewCount: 289,
    stock: 40,
  },
]

const categories = [
  { id: '1', name: 'Electronics', slug: 'electronics' },
  { id: '2', name: 'Clothing', slug: 'clothing' },
  { id: '3', name: 'Furniture', slug: 'furniture' },
  { id: '4', name: 'Home & Garden', slug: 'home-garden' },
  { id: '5', name: 'Sports', slug: 'sports' },
  { id: '6', name: 'Accessories', slug: 'accessories' },
]

function ShopContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 500])
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Calculate min and max prices
  const minPrice = 0
  const maxPrice = 500

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Category filter
      if (selectedCategories.length > 0) {
        const categoryMatch = selectedCategories.includes(product.category.toLowerCase())
        if (!categoryMatch) return false
      }

      // Price filter
      if (product.price < selectedPriceRange[0] || product.price > selectedPriceRange[1]) {
        return false
      }

      return true
    })
  }, [searchQuery, selectedCategories, selectedPriceRange])

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]

    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price)
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return sorted
    }
  }, [filteredProducts, sortBy])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const handleClearFilters = () => {
    setSelectedCategories([])
    setSelectedPriceRange([minPrice, maxPrice])
    setSearchQuery('')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Shop</h1>
        <p className="text-muted-foreground">
          Browse our collection of {filteredProducts.length} products
        </p>
      </div>

      {/* Search and filters bar */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Mobile filters trigger */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <ProductFilters
                  categories={categories}
                  priceRange={selectedPriceRange}
                  selectedCategories={selectedCategories}
                  selectedPriceRange={selectedPriceRange}
                  onCategoryChange={handleCategoryChange}
                  onPriceRangeChange={setSelectedPriceRange}
                  onClearFilters={handleClearFilters}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort */}
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>

            {/* View toggle */}
            <div className="hidden md:flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex gap-8">
        {/* Filters sidebar - desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <ProductFilters
            categories={categories}
            priceRange={selectedPriceRange}
            selectedCategories={selectedCategories}
            selectedPriceRange={selectedPriceRange}
            onCategoryChange={handleCategoryChange}
            onPriceRangeChange={setSelectedPriceRange}
            onClearFilters={handleClearFilters}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                No products found matching your criteria
              </p>
              <Button onClick={handleClearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  )
}
