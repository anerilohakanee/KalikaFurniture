'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Card = ({
  children,
  image,
  title,
  description,
  className = '',
  onClick,
  isHoverable = true,
}) => {
  return (
    <motion.div
      whileHover={isHoverable ? { y: -5 } : {}}
      className={`bg-white rounded-xl shadow-md overflow-hidden transition duration-300 ${
        isHoverable ? 'hover:shadow-xl' : ''
      } ${className}`}
      onClick={onClick}
    >
      {image && (
        <div className="relative h-48">
          <Image
            src={image}
            alt={title || 'Card image'}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        {title && (
          <h3 className="text-xl font-bold mb-2">{title}</h3>
        )}
        {description && (
          <p className="text-gray-600 mb-4">{description}</p>
        )}
        {children}
      </div>
    </motion.div>
  );
};

export default Card; 