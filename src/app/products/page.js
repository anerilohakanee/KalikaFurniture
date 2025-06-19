'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useCart } from '@/lib/CartContext';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import Image from 'next/image';
import { FiSearch, FiFilter, FiX, FiStar, FiShoppingCart, FiCheck } from 'react-icons/fi';

// Mock data with more products and categories
const products = [
  {
    id: 1,
    name: 'Modern Sofa Set',
    category: 'Living Room',
    price: 49999,
    image: 'https://i.pinimg.com/736x/ee/4c/8b/ee4c8b9b9a910c65e4855393d49d06e5.jpg',
    description: 'Elegant 3-seater sofa with premium fabric and wooden frame',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    features: ['Premium Fabric', 'Wooden Frame', 'Easy Assembly'],
    colors: ['Beige', 'Gray', 'Navy'],
    dimensions: '84"W x 36"D x 32"H'
  },
  {
    id: 2,
    name: 'Queen Size Bed',
    category: 'Bedroom',
    price: 34999,
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'Solid wood queen size bed with storage',
    rating: 4.8,
    reviews: 95,
    inStock: true,
    features: ['Storage Space', 'Solid Wood', 'Easy Assembly'],
    colors: ['Walnut', 'Oak', 'Mahogany'],
    dimensions: '64"W x 86"D x 48"H'
  },
  {
    id: 3,
    name: 'Dining Table Set',
    category: 'Dining Room',
    price: 28999,
    image: 'https://i.pinimg.com/736x/b4/c0/80/b4c08035e66b26bced7b0be5717f19c8.jpg',
    description: '6-seater dining table with upholstered chairs',
    rating: 4.3,
    reviews: 76,
    inStock: true,
    features: ['Extendable', 'Scratch Resistant', '6 Chairs Included'],
    colors: ['White', 'Black', 'Walnut'],
    dimensions: '72"W x 36"D x 30"H'
  },
  {
    id: 4,
    name: 'Executive Desk',
    category: 'Office',
    price: 22999,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'Modern executive desk with cable management',
    rating: 4.6,
    reviews: 64,
    inStock: true,
    features: ['Cable Management', '2 Drawers', 'Ergonomic Design'],
    colors: ['Black', 'White', 'Oak'],
    dimensions: '60"W x 30"D x 30"H'
  },
  {
    id: 5,
    name: 'Leather Recliner',
    category: 'Living Room',
    price: 18999,
    image: 'https://i.pinimg.com/736x/20/ec/e7/20ece7fad28f95dc7910366a68790c71.jpg',
    description: 'Premium leather recliner with footrest',
    rating: 4.7,
    reviews: 112,
    inStock: false,
    features: ['Genuine Leather', 'Reclining', 'Footrest'],
    colors: ['Brown', 'Black'],
    dimensions: '36"W x 40"D x 42"H'
  },
  {
    id: 6,
    name: 'Bookshelf',
    category: 'Office',
    price: 12999,
    image: 'https://i.pinimg.com/736x/54/7e/85/547e85d10b317553dcfce4215c77ca11.jpg',
    description: '5-tier wooden bookshelf with adjustable shelves',
    rating: 4.2,
    reviews: 43,
    inStock: true,
    features: ['Adjustable Shelves', 'Solid Wood', 'Wall Mountable'],
    colors: ['Oak', 'Walnut', 'White'],
    dimensions: '30"W x 12"D x 60"H'
  }
];

const categories = ['All', 'Living Room', 'Bedroom', 'Dining Room', 'Office'];

export default function Products() {
  const { addToCart, isItemInCart, getItemQuantity } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState({});
  const [successMessage, setSuccessMessage] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleAddToCart = async (product) => {
    setIsLoading(prev => ({ ...prev, [product.id]: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Add to cart
      addToCart(product, 1);
      
      // Show success message
      setSuccessMessage(prev => ({ ...prev, [product.id]: true }));
      
      // Hide success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage(prev => ({ ...prev, [product.id]: false }));
      }, 2000);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, [product.id]: false }));
    }
  };

  // Close modal when pressing escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <PageLayout className="pt-0">

      {/* Hero Section with Background Image */}
      <div className="relative h-64 w-full bg-gray-900 mb-3">
        <Image
          src="https://i.pinimg.com/736x/e5/06/ca/e506ca21d3b4d565044691a87bc5cc1d.jpg"
          alt="Furniture Collection"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Products</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Discover our premium collection of furniture designed to transform your space
          </p>
        </div>
      </div>

      {/* Mobile filter dialog */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
              className="relative h-full w-80 max-w-xs bg-white shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h2 className="text-lg font-medium">Filters</h2>
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <div className="p-4 space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setMobileFiltersOpen(false);
                        }}
                        className={`block w-full px-3 py-2 text-left rounded-md ${selectedCategory === category ? 'bg-yellow-100 text-yellow-800' : 'hover:bg-gray-50'}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Mobile filter button */}
          <button
            type="button"
            className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <FiFilter className="h-5 w-5" />
            <span>Filters</span>
          </button>

          {/* Desktop category filters */}
          <div className="hidden lg:flex gap-2 flex-wrap">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Search and sort */}
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="hidden md:block px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Active filters */}
        {(selectedCategory !== 'All' || searchQuery) && (
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-600">Active filters:</span>
            {selectedCategory !== 'All' && (
              <Badge
                variant="default"
                onRemove={() => setSelectedCategory('All')}
              >
                Category: {selectedCategory}
              </Badge>
            )}
            {searchQuery && (
              <Badge
                variant="default"
                onRemove={() => setSearchQuery('')}
              >
                Search: "{searchQuery}"
              </Badge>
            )}
          </div>
        )}
      </motion.div>

      {/* Products Grid */}
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {sortedProducts.map((product, index) => {
            const isInCart = isItemInCart(product.id);
            const cartQuantity = getItemQuantity(product.id);
            const isProductLoading = isLoading[product.id] || false;
            const isSuccess = successMessage[product.id] || false;
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
              >
                <Card
                  image={product.image}
                  title={product.name}
                  description={product.description}
                  onClick={() => setSelectedProduct(product)}
                  className="h-full flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.map(feature => (
                      <Badge key={feature} variant="default" size="sm">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
                      {!product.inStock && (
                        <span className="block text-xs text-red-500">Out of stock</span>
                      )}
                      {isInCart && (
                        <span className="block text-xs text-green-600">
                          {cartQuantity} in cart
                        </span>
                      )}
                    </div>
                    <Button
                      variant={isSuccess ? 'success' : (product.inStock ? 'primary' : 'secondary')}
                      size="sm"
                      isLoading={isProductLoading}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (product.inStock) {
                          handleAddToCart(product);
                        }
                      }}
                      disabled={!product.inStock}
                      icon={isSuccess ? <FiCheck className="w-4 h-4" /> : (product.inStock && <FiShoppingCart className="w-4 h-4" />)}
                    >
                      {isSuccess ? 'Added!' : (product.inStock ? 'Add to Cart' : 'Out of Stock')}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {sortedProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="mx-auto max-w-md">
            <Image
              src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="No products found"
              width={300}
              height={200}
              className="mx-auto mb-6"
            />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            >
              Clear all filters
            </Button>
          </div>
        </motion.div>
      )}

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-80 md:h-96">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover rounded-t-xl"
                  priority
                />
                <button
                  className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white"
                  onClick={() => setSelectedProduct(null)}
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                    <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'fill-current' : ''}`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600">
                        {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg min-w-[200px]">
                    <div className="text-3xl font-bold mb-4">₹{selectedProduct.price.toLocaleString()}</div>
                    <Button
                      variant={successMessage[selectedProduct.id] ? 'success' : 'primary'}
                      size="lg"
                      className="w-full"
                      isLoading={isLoading[selectedProduct.id]}
                      onClick={() => handleAddToCart(selectedProduct)}
                      icon={successMessage[selectedProduct.id] ? <FiCheck className="w-5 h-5" /> : <FiShoppingCart className="w-5 h-5" />}
                    >
                      {successMessage[selectedProduct.id] ? 'Added to Cart!' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Features</h3>
                    <ul className="space-y-2">
                      {selectedProduct.features.map(feature => (
                        <li key={feature} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Details</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Dimensions</h4>
                        <p>{selectedProduct.dimensions}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Available Colors</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedProduct.colors.map(color => (
                            <Badge key={color} variant="default">
                              {color}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Availability</h4>
                        <p className={selectedProduct.inStock ? 'text-green-600' : 'text-red-600'}>
                          {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}