'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { 
  getCartFromStorage, 
  saveCartToStorage, 
  addToCart as addToCartUtil,
  removeFromCart as removeFromCartUtil,
  updateCartItemQuantity as updateCartItemQuantityUtil,
  clearCart as clearCartUtil,
  getCartTotal,
  getCartItemCount,
  isItemInCart as isItemInCartUtil,
  getItemQuantity as getItemQuantityUtil
} from './cartUtils';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize cart from localStorage on mount
  useEffect(() => {
    const initializeCart = () => {
      const savedCart = getCartFromStorage();
      setCart(savedCart);
      setIsLoading(false);
    };

    // Small delay to ensure window is available
    const timer = setTimeout(initializeCart, 100);
    return () => clearTimeout(timer);
  }, []);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    const updatedCart = addToCartUtil(product, quantity);
    setCart(updatedCart);
    return updatedCart;
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    const updatedCart = removeFromCartUtil(productId);
    setCart(updatedCart);
    return updatedCart;
  };

  // Update item quantity
  const updateCartItemQuantity = (productId, quantity) => {
    const updatedCart = updateCartItemQuantityUtil(productId, quantity);
    setCart(updatedCart);
    return updatedCart;
  };

  // Clear cart
  const clearCart = () => {
    const emptyCart = clearCartUtil();
    setCart(emptyCart);
    return emptyCart;
  };

  // Check if item is in cart
  const isItemInCart = (productId) => {
    return isItemInCartUtil(productId);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId) => {
    return getItemQuantityUtil(productId);
  };

  // Get cart total
  const total = getCartTotal(cart);

  // Get cart item count
  const itemCount = getCartItemCount(cart);

  const value = {
    cart,
    total,
    itemCount,
    isLoading,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    isItemInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 