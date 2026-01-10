#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create placeholder directories
const dirs = [
  'public/placeholder-products',
  'public/placeholder-categories',
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Simple SVG placeholder generator
function createSVGPlaceholder(width, height, text, color = '#e2e8f0', textColor = '#64748b') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${color}"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="${textColor}" text-anchor="middle" dy=".3em">${text}</text>
  </svg>`;
}

// Create product image placeholders
const products = [
  { name: 'headphones', label: 'Headphones' },
  { name: 'watch', label: 'Smart Watch' },
  { name: 'chair', label: 'Office Chair' },
  { name: 'tshirt', label: 'T-Shirt' },
  { name: 'backpack', label: 'Backpack' },
  { name: 'lamp', label: 'LED Lamp' },
  { name: 'shoes', label: 'Running Shoes' },
  { name: 'speaker', label: 'Speaker' },
];

products.forEach(product => {
  const svg = createSVGPlaceholder(400, 400, product.label);
  fs.writeFileSync(
    `public/placeholder-products/${product.name}.jpg.svg`,
    svg
  );
  console.log(`Created placeholder: ${product.name}.jpg.svg`);
});

// Create category image placeholders
const categories = [
  { name: 'electronics', label: 'Electronics' },
  { name: 'clothing', label: 'Clothing' },
  { name: 'furniture', label: 'Furniture' },
  { name: 'home', label: 'Home & Garden' },
  { name: 'sports', label: 'Sports' },
  { name: 'books', label: 'Books' },
  { name: 'beauty', label: 'Beauty' },
];

categories.forEach(category => {
  const svg = createSVGPlaceholder(400, 400, category.label);
  fs.writeFileSync(
    `public/placeholder-categories/${category.name}.jpg.svg`,
    svg
  );
  console.log(`Created placeholder: ${category.name}.jpg.svg`);
});

console.log('\nAll placeholders created successfully!');
