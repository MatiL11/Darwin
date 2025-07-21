import { Variants } from "framer-motion";

// Animation variants for the fade and slide effects
export const fadeSlideVariants: Variants = {
    hidden: { 
      opacity: 0,
      x: -20 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { 
        duration: 0.3,
        ease: "easeIn"
      } 
    }
  };