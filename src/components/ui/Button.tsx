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
  elevation?: 1 | 2 | 3 | 4;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    elevation = 2,
    disabled,
    children,
    ...props
  }, ref) => {
    // Google Material Design inspired elevation shadows
    const elevationClasses = {
      1: 'shadow-sm',
      2: 'shadow',
      3: 'shadow-md',
      4: 'shadow-lg',
    };
    
    // Enhanced styles with better contrast for light mode
    const variantStyles = {
      primary: 'bg-primary text-white hover:bg-primary-600 active:bg-primary-700 shadow-lg shadow-primary/30 hover:shadow-xl',
      secondary: 'bg-secondary text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-lg shadow-secondary/30 hover:shadow-xl',
      accent: 'bg-accent text-white hover:bg-accent-600 active:bg-accent-700 shadow-lg shadow-accent/30 hover:shadow-xl',
      outline: 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:border-primary hover:text-primary hover:bg-primary/5',
      ghost: 'text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary',
      destructive: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-lg shadow-red-500/30 hover:shadow-xl'
    };
    
    const sizeStyles = {
      sm: 'h-9 px-3 rounded-lg text-sm',
      md: 'h-10 px-4 py-2 rounded-lg',
      lg: 'h-12 px-8 rounded-lg text-base font-medium',
      icon: 'h-10 w-10 rounded-xl p-0'
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
          elevationClasses[elevation],
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
        <span className="font-medium">
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