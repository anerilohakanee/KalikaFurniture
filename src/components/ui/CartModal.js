'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/CartContext';
import { useRouter } from 'next/navigation';
import Button from './Button';
import { FiX, FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import Image from 'next/image';

export default function CartModal({ isOpen, onClose }) {
  const router = useRouter();
  const { cart, total, itemCount, removeFromCart, updateCartItemQuantity, clearCart } = useCart();
  const [isClearing, setIsClearing] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const handleClearCart = async () => {
    setIsClearing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    clearCart();
    setIsClearing(false);
  };

  const handleCheckout = () => {
    onClose(); // Close the cart modal
    router.push('/checkout'); // Navigate to checkout page
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <FiShoppingBag className="w-6 h-6 text-yellow-600" />
                <h2 className="text-xl font-semibold">Shopping Cart</h2>
                {itemCount > 0 && (
                  <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2 py-1 rounded-full">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto max-h-[60vh]">
              {cart.length === 0 ? (
                <div className="p-8 text-center">
                  <FiShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600 mb-6">Add some products to get started!</p>
                  <Button
                    variant="primary"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 p-4 border rounded-lg"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                        <div className="text-lg font-semibold text-yellow-600">
                          ₹{item.price.toLocaleString()}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          Total: ₹{(item.price * item.quantity).toLocaleString()}
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                          title="Remove item"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-yellow-600">
                    ₹{total.toLocaleString()}
                  </span>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    onClick={handleClearCart}
                    isLoading={isClearing}
                    className="flex-1"
                  >
                    Clear Cart
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleCheckout}
                    className="flex-1"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 