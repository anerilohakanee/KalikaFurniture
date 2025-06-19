'use client';

import { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import CartModal from '@/components/ui/CartModal';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">Kalika Furniture</div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/products" className="hover:text-gray-600">Products</a>
              <a href="/categories" className="hover:text-gray-600">Categories</a>
              <a href="/stores" className="hover:text-gray-600">Stores</a>
              <a href="/contact" className="hover:text-gray-600">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                {isSearchOpen && (
                  <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full relative"
                onClick={handleCartClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Cart Modal */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
} 