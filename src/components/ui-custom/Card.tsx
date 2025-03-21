
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', hover = false, children, ...props }, ref) => {
    // Base styles
    const baseStyles = "rounded-2xl transition-all duration-300";
    
    // Variant styles
    const variantStyles = {
      default: "bg-card text-card-foreground shadow-sm",
      glass: "glass-panel",
      bordered: "border border-border bg-transparent"
    };
    
    // Padding styles
    const paddingStyles = {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8"
    };
    
    // Hover styles
    const hoverStyles = hover ? "hover:shadow-lg hover:transform hover:translate-y-[-4px]" : "";
    
    return (
      <div
        className={cn(
          baseStyles,
          variantStyles[variant],
          paddingStyles[padding],
          hoverStyles,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
