'use client';

import { Inter } from 'next/font/google';
import { CartProvider } from '@/lib/CartContext';
import Header from '@/components/layout/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Kalika Furniture - India's Favorite Furniture Brand</title>
        <meta name="description" content="Discover premium furniture for your home and office at Kalika Furniture. Shop online for the best deals on furniture in India." />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <Header />

          <div className="pt-16">
            {children}
          </div>

          <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">About Kalika Furniture</h3>
                  <p className="text-gray-400">
                    India's favorite furniture brand with 50+ stores and 3,000+ distributors nationwide.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
                    <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
                    <li><a href="/stores" className="text-gray-400 hover:text-white">Store Locator</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                  <ul className="space-y-2">
                    <li><a href="/shipping" className="text-gray-400 hover:text-white">Shipping & Delivery</a></li>
                    {/* <li><a href="/returns" className="text-gray-400 hover:text-white">Returns & Refunds</a></li> */}
                    <li><a href="/faq" className="text-gray-400 hover:text-white">FAQ</a></li>
                    {/* <li><a href="/track-order" className="text-gray-400 hover:text-white">Track Order</a></li> */}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>+91 9890602225</li>
                    <li>furniture.enquiry@kalikafurniture.com</li>
                    <li>Ranjangaon Road, Walunj, Pandharpur, Chatrapati Sambhajinagar Maharashtra - 431136</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} Kalika Furniture. All Rights Reserved.</p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
