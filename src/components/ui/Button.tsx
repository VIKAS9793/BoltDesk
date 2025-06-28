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
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
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
    const elevationClass = elevation ? `elevation-${elevation}` : '';
    
    return (
      <motion.button
        whileHover={!disabled && !isLoading ? { scale: 1.02 } : undefined}
        whileTap={!disabled && !isLoading ? { scale: 0.98 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(
          'btn',
          `btn-${variant}`,
          `btn-${size}`,
          elevationClass,
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
          <span className="mr-2">
            {leftIcon}
          </span>
        )}
        <span>
          {children}
        </span>
        {!isLoading && rightIcon && (
          <span className="ml-2">
            {rightIcon}
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };