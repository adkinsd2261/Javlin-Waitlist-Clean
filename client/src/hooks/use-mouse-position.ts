import { useEffect, useRef } from 'react';

export function useMouseAttraction() {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      element.style.setProperty('--mouse-x', `${Math.max(0, Math.min(100, x))}%`);
      element.style.setProperty('--mouse-y', `${Math.max(0, Math.min(100, y))}%`);
    };

    const handleMouseLeave = () => {
      element.style.setProperty('--mouse-x', '50%');
      element.style.setProperty('--mouse-y', '50%');
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return elementRef;
}