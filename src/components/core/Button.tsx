import React, { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { Spinner } from '../IconComponents'

// Style variables outside component
const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

const variantClasses = {
  primary: 'bg-voca-primary text-voca-primary-fg hover:bg-voca-primary/90',
  outline: 'bg-voca-surface text-voca-text-secondary border border-voca-border hover:bg-accent hover:text-accent-foreground',
  inverse: 'bg-voca-text-primary text-white hover:bg-voca-text-primary/90'
}

const sizeClasses = {
  sm: 'h-9 px-3 text-sm rounded-md',
  md: 'h-11 px-4 py-2 text-sm rounded-lg',
  lg: 'h-[52px] px-6 py-3 text-base rounded-lg',
}

const iconSizeClasses = {
  sm: 16,
  md: 16,
  lg: 20,
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'inverse'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  loading?: boolean
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    icon, 
    loading = false, 
    fullWidth = false,
    children,
    disabled,
    ...props 
  }, ref) => {
    const buttonClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && 'w-full',
      !disabled && 'cursor-pointer',
      className
    )
    
    return (
      <button
        className={buttonClasses}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <Spinner 
            className={cn(
              iconSizeClasses[size],
              children && 'me-2'
            )}
            size={iconSizeClasses[size]}
          />
        )}
        
        {children && (
          <span className={cn(loading && 'opacity-70')}>
            {children}
          </span>
        )}
      </button>
    )
  }
)