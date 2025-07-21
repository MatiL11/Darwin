import { ReactNode, forwardRef, ForwardedRef } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';

interface TransitionContainerProps extends HTMLMotionProps<'div'> {
  variants?: any;
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * A reusable container component that applies fade-in and slide-in animations
 * to its children with configurable delay for staggered animations
 */
const TransitionContainer = forwardRef<HTMLDivElement, TransitionContainerProps>((
  { children, delay = 0, className = '', variants, ...otherMotionProps },
  ref: ForwardedRef<HTMLDivElement>
) => {
  const defaultVariants = {
    hidden: { 
      opacity: 0,
      y: 10 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        delay,
        ease: "easeOut"
      } 
    }
  };
  
  return (
    <motion.div
      ref={ref}
      variants={variants || defaultVariants}
      initial="hidden"
      animate="visible"
      className={className}
      {...otherMotionProps}
    >
      {children}
    </motion.div>
  );
});

export default TransitionContainer; 