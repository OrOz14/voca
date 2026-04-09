import { cn } from '@/lib/utils'
import React from 'react'
import { Spinner } from '../IconComponents'

const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
const iconSizeClasses = 'h-[52px] w-[52px]'

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, children, loading = false, disabled = false, size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(baseClasses, iconSizeClasses, className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {children}
      </button>
    )
  }
)