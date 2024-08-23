import React, { useEffect, useRef } from 'react';
import './MouseEffect.css';

function MouseEffect() {
  const hoverRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      if (hoverRef.current) {
        hoverRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div className="mouse-effect" ref={hoverRef} />;
}

export default MouseEffect;
