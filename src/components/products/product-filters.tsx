'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'

interface FilterProps {
  categories: Array<{ id: string; name: string; slug: string }>
  priceRange: [number, number]
  selectedCategories: string[]
  selectedPriceRange: [number, number]
  onCategoryChange: (category: string) => void
  onPriceRangeChange: (range: [number, number]) => void
  onClearFilters: () => void
  minPrice: number
  maxPrice: number
}

export function ProductFilters({
  categories,
  priceRange,
  selectedCategories,
  selectedPriceRange,
  onCategoryChange,
  onPriceRangeChange,
  onClearFilters,
  minPrice,
  maxPrice,
}: FilterProps) {
  const hasActiveFilters = selectedCategories.length > 0 ||
    selectedPriceRange[0] !== minPrice ||
    selectedPriceRange[1] !== maxPrice

  return (
    <aside className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-8 px-2 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <Separator />

      {/* Price Range */}
      <Accordion type="single" collapsible defaultValue="price">
        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium py-3">
            Price Range
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="px-2">
              <Slider
                min={minPrice}
                max={maxPrice}
                step={10}
                value={selectedPriceRange}
                onValueChange={(value) => onPriceRangeChange([value[0], value[1]])}
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Label htmlFor="min-price">Min</Label>
                <span className="font-medium">${selectedPriceRange[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="max-price">Max</Label>
                <span className="font-medium">${selectedPriceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator />

      {/* Categories */}
      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories">
          <AccordionTrigger className="text-base font-medium py-3">
            Categories
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => onCategoryChange(category.id)}
                />
                <Label
                  htmlFor={category.id}
                  className="cursor-pointer flex-1 text-sm font-normal"
                >
                  {category.name}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}
