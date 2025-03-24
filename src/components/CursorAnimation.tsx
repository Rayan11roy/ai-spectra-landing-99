
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const CursorAnimation = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorStyle = () => {
      const target = document.elementFromPoint(position.x, position.y) as HTMLElement;
      const clickableElements = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'];
      
      // Check if the element or its parents have cursor:pointer style
      let currentElement = target;
      let isPointerElement = false;
      
      while (currentElement && !isPointerElement) {
        if (clickableElements.includes(currentElement.tagName)) {
          isPointerElement = true;
        } else {
          const computedStyle = window.getComputedStyle(currentElement);
          if (computedStyle.cursor === 'pointer') {
            isPointerElement = true;
          }
        }
        currentElement = currentElement.parentElement as HTMLElement;
      }
      
      setIsPointer(isPointerElement);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    if (!isMobile) {
      document.addEventListener('mousemove', updateCursorPosition);
      document.addEventListener('mousemove', updateCursorStyle);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mousemove', updateCursorStyle);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [position.x, position.y, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* The dot cursor */}
      <div
        className={`cursor-dot ${isVisible ? 'opacity-100' : 'opacity-0'} ${isPointer ? 'cursor-dot-active' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      
      {/* The ring cursor */}
      <div
        className={`cursor-ring ${isVisible ? 'opacity-100' : 'opacity-0'} ${isPointer ? 'cursor-ring-active' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
};

export default CursorAnimation;
