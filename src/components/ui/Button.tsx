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
    // Enhanced styles for better visibility in light mode
    const variantStyles = {
      primary: 'bg-primary text-white hover:bg-primary-600 shadow-md shadow-primary/30 hover:shadow-lg',
      secondary: 'bg-secondary text-white hover:bg-secondary-600 shadow-md shadow-secondary/30 hover:shadow-lg',
      accent: 'bg-accent text-white hover:bg-accent-600 shadow-md shadow-accent/30 hover:shadow-lg',
      outline: 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:border-primary hover:text-primary hover:bg-primary/5 shadow-sm',
      ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary',
      destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-500/30 hover:shadow-lg'
    };
    
    const sizeStyles = {
      sm: 'h-9 px-3 rounded-lg text-sm',
      md: 'h-10 px-4 py-2 rounded-lg',
      lg: 'h-11 px-8 rounded-lg text-base font-medium',
      icon: 'h-10 w-10 rounded-full p-0'
    };

    return (
      <motion.button
        whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
        whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(
          'btn inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          isLoading && 'opacity-70 pointer-events-none',
          className
        )}
        disabled={isLoading || disabled}
        ref={ref}
        {...props}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {!isLoading && leftIcon && (
          <span className="mr-2 flex-shrink-0">
            {leftIcon}
          </span>
        )}
        <span>
          {children}
        </span>
        {!isLoading && rightIcon && (
          <span className="ml-2 flex-shrink-0">
            {rightIcon}
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };