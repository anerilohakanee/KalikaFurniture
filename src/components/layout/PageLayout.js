'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PageLayout = ({
  children,
  title,
  description,
  className = '',
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.main
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`min-h-screen pt-20 pb-16 ${className}`}
    >
      <div className="container mx-auto px-4">
        {(title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-12"
          >
            {title && (
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
            )}
            {description && (
              <p className="text-gray-600 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.main>
  );
};

export default PageLayout; 