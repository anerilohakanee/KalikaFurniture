'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
      {/* Hero Section */}
      <div className="relative h-96 w-full bg-gray-900">
        <Image
          src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Furniture Showcase"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Explore Our Collections</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Discover premium furniture designed to elevate every space in your home
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Furniture Categories</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-64">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                    <p className="text-gray-200 mt-2">{category.description}</p>
                  </div>
                </div>
              </div>

              {/* Featured Products */}
              <div className="p-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-lg text-gray-800">Featured</h4>
                  <Link 
                    href={`/categories/${category.name.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-yellow-600 font-medium"
                  >
                    View all →
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {category.featuredProducts?.map((product) => (
                    <Link 
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="flex items-center gap-4 p-3 rounded-lg"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900">
                          {product.name}
                        </h5>
                        <p className="text-yellow-700 font-semibold">₹{product.price.toLocaleString('en-IN')}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Choosing?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Our design experts can help you select the perfect furniture for your space.
          </p>
          <button className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-full">
            Book a Free Consultation
          </button>
        </div>
      </div>
    </main>
  );
}