'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  icon,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-yellow-400 text-black hover:bg-yellow-300 focus:ring-yellow-400',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400',
    outline: 'border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black focus:ring-yellow-400',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-400',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {icon && icon}
          {children}
        </div>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button; 