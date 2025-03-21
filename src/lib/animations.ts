
import { useEffect, useState, useRef } from 'react';

/**
 * Hook that triggers animation when element enters viewport
 */
export function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.15,
      ...options
    });

    observer.observe(currentRef);
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return { ref, isInView };
}

/**
 * Animation class utility for staggered children animations
 */
export function getStaggeredChildrenAnimation(index: number, baseDelay = 100) {
  return {
    className: `animate-fade-in-up`,
    style: { animationDelay: `${baseDelay * index}ms` }
  };
}

/**
 * Generate animation class based on isInView state
 */
export function getInViewAnimation(isInView: boolean, animation = 'fade-in-up', delay = 0) {
  if (!isInView) return '';
  return delay 
    ? `animate-${animation} animation-delay-${delay}`
    : `animate-${animation}`;
}
