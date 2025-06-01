import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    children,
    ...props
  }, ref) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    const sizeClass = `btn-${size}`;

    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(
          baseClass,
          variantClass,
          sizeClass,
          isLoading && 'opacity-70 pointer-events-none',
          className
        )}
        disabled={isLoading || disabled}
        ref={ref as any}
        {...props}
      >
        {isLoading && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mr-2"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
          </motion.span>
        )}
        {!isLoading && leftIcon && (
          <motion.span 
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="mr-2"
          >
            {leftIcon}
          </motion.span>
        )}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {children}
        </motion.span>
        {!isLoading && rightIcon && (
          <motion.span 
            initial={{ x: 5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="ml-2"
          >
            {rightIcon}
          </motion.span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };