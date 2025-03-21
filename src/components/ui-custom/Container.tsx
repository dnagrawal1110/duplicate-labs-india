
import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', padding = true, children, ...props }, ref) => {
    const sizeStyles = {
      sm: "max-w-3xl",
      md: "max-w-4xl",
      lg: "max-w-5xl",
      xl: "max-w-6xl",
      full: "max-w-full"
    };
    
    const paddingStyles = padding ? "px-4 sm:px-6 lg:px-8" : "";
    
    return (
      <div
        className={cn(
          "mx-auto w-full",
          sizeStyles[size],
          paddingStyles,
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

Container.displayName = "Container";

export { Container };
