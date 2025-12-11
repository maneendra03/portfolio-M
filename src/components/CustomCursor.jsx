import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if touch device
    if ('ontouchstart' in window) return;

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      gsap.to([cursorRef.current, cursorDotRef.current], {
        opacity: 1,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cursorRef.current, cursorDotRef.current], {
        opacity: 0,
        duration: 0.3,
      });
    };

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .magnetic-wrap, .project-card, input, textarea');
    
    const handleElementEnter = () => {
      cursorRef.current?.classList.add('hover');
    };

    const handleElementLeave = () => {
      cursorRef.current?.classList.remove('hover');
    };

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementEnter);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${pos.current.x}px`;
        cursorRef.current.style.top = `${pos.current.y}px`;
      }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${mouse.current.x}px`;
        cursorDotRef.current.style.top = `${mouse.current.y}px`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementEnter);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={cursorDotRef} className="cursor-dot" />
    </>
  );
};

export default CustomCursor;
