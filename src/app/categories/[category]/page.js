'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter and sort states
  const [sortBy, setSortBy] = useState('featured');
  const [filterBy, setFilterBy] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [material, setMaterial] = useState('all');
  const [color, setColor] = useState('all');

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        // Fetch category details
        const categoryResponse = await fetch(`/api/categories/${params.category}`);
        if (!categoryResponse.ok) {
          throw new Error('Failed to fetch category details');
        }
        const categoryData = await categoryResponse.json();
        setCategory(categoryData);

        // Fetch all products for this category
        const productsResponse = await fetch(`/api/categories/${params.category}/products`);
        if (!productsResponse.ok) {
          throw new Error('Failed to fetch products');
        }
        const productsData = await productsResponse.json();
        setProducts(productsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [params.category]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts = [...products];

    // Apply filters
    if (filterBy === 'price-range') {
      if (priceRange.min !== '') {
        filteredProducts = filteredProducts.filter(product => product.price >= parseInt(priceRange.min));
      }
      if (priceRange.max !== '') {
        filteredProducts = filteredProducts.filter(product => product.price <= parseInt(priceRange.max));
      }
    } else if (filterBy === 'material') {
      if (material !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
          product.material && product.material.toLowerCase() === material.toLowerCase()
        );
      }
    } else if (filterBy === 'color') {
      if (color !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
          product.color && product.color.toLowerCase() === color.toLowerCase()
        );
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest-first':
        filteredProducts.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      case 'rating':
        filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'featured':
      default:
        // Keep original order for featured
        break;
    }

    return filteredProducts;
  }, [products, sortBy, filterBy, priceRange, material, color]);

  // Get unique materials and colors from products
  const uniqueMaterials = useMemo(() => {
    const materials = products
      .map(product => product.material)
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index);
    return materials;
  }, [products]);

  const uniqueColors = useMemo(() => {
    const colors = products
      .map(product => product.color)
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index);
    return colors;
  }, [products]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="relative h-64 w-full bg-gray-900">
        <Image
          src={category?.image}
          alt={category?.name}
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{category?.name}</h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              {category?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            All Products ({filteredAndSortedProducts.length})
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <select 
              className="border border-gray-300 rounded-md px-4 py-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest-first">Newest First</option>
              <option value="rating">Highest Rated</option>
            </select>
            <select 
              className="border border-gray-300 rounded-md px-4 py-2"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="all">Filter by: All</option>
              <option value="price-range">Price Range</option>
              {/* <option value="material">Material</option>
              <option value="color">Color</option> */}
            </select>
          </div>
        </div>

        {/* Filter Options */}
        {filterBy === 'price-range' && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-3">Price Range</h3>
            <div className="flex gap-4 items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                <input
                  type="number"
                  placeholder="Min"
                  className="border border-gray-300 rounded-md px-3 py-2 w-32"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                <input
                  type="number"
                  placeholder="Max"
                  className="border border-gray-300 rounded-md px-3 py-2 w-32"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                />
              </div>
              <button
                onClick={() => setPriceRange({ min: '', max: '' })}
                className="mt-6 px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {filterBy === 'material' && uniqueMaterials.length > 0 && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-3">Material</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setMaterial('all')}
                className={`px-4 py-2 rounded-md text-sm ${
                  material === 'all' 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Materials
              </button>
              {uniqueMaterials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setMaterial(mat)}
                  className={`px-4 py-2 rounded-md text-sm ${
                    material === mat 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>
        )}

        {filterBy === 'color' && uniqueColors.length > 0 && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setColor('all')}
                className={`px-4 py-2 rounded-md text-sm ${
                  color === 'all' 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Colors
              </button>
              {uniqueColors.map((col) => (
                <button
                  key={col}
                  onClick={() => setColor(col)}
                  className={`px-4 py-2 rounded-md text-sm ${
                    color === col 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
            <button
              onClick={() => {
                setFilterBy('all');
                setSortBy('featured');
                setPriceRange({ min: '', max: '' });
                setMaterial('all');
                setColor('all');
              }}
              className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAndSortedProducts.map((product) => (
            <Link 
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-yellow-700 font-bold text-lg">₹{product.price.toLocaleString('en-IN')}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm text-gray-500">Rating:</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < (product.rating || 0) ? 'text-yellow-500' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
} 