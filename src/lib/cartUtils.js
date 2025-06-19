// Cart utilities for localStorage persistence and cart operations

const CART_STORAGE_KEY = 'furniture_cart';

// Get cart from localStorage
export const getCartFromStorage = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

// Save cart to localStorage
export const saveCartToStorage = (cart) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Add item to cart
export const addToCart = (product, quantity = 1) => {
  const cart = getCartFromStorage();
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex >= 0) {
    // Update existing item quantity
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.push({
      ...product,
      quantity,
      addedAt: new Date().toISOString()
    });
  }
  
  saveCartToStorage(cart);
  return cart;
};

// Remove item from cart
export const removeFromCart = (productId) => {
  const cart = getCartFromStorage();
  const updatedCart = cart.filter(item => item.id !== productId);
  saveCartToStorage(updatedCart);
  return updatedCart;
};

// Update item quantity
export const updateCartItemQuantity = (productId, quantity) => {
  const cart = getCartFromStorage();
  const updatedCart = cart.map(item => 
    item.id === productId 
      ? { ...item, quantity: Math.max(0, quantity) }
      : item
  ).filter(item => item.quantity > 0); // Remove items with 0 quantity
  
  saveCartToStorage(updatedCart);
  return updatedCart;
};

// Clear cart
export const clearCart = () => {
  saveCartToStorage([]);
  return [];
};

// Get cart total
export const getCartTotal = (cart) => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Get cart item count
export const getCartItemCount = (cart) => {
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// Check if item is in cart
export const isItemInCart = (productId) => {
  const cart = getCartFromStorage();
  return cart.some(item => item.id === productId);
};

// Get item quantity in cart
export const getItemQuantity = (productId) => {
  const cart = getCartFromStorage();
  const item = cart.find(item => item.id === productId);
  return item ? item.quantity : 0;
}; 