'use client';

import { useEffect, useRef } from 'react';

export default function CheckmarkAnimation({ size = 80, color = '#4ade80' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = size;
    canvas.height = size;
    
    // Animation variables
    let animationFrameId: number;
    let progress = 0;
    const duration = 1000; // 1 second
    const startTime = Date.now();

    // Draw the checkmark
    const drawCheckmark = (progress: number) => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      
      // Set styles
      ctx.strokeStyle = color;
      ctx.lineWidth = size * 0.1;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Draw circle
      const center = size / 2;
      const radius = size * 0.4;
      const startAngle = -Math.PI / 2; // Start from top
      const endAngle = startAngle + (Math.PI * 2 * progress);
      
      ctx.beginPath();
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.stroke();
      
      // Draw checkmark (only when circle is complete)
      if (progress >= 1) {
        const checkProgress = Math.min(1, (progress - 1) * 3); // Speed up checkmark
        
        ctx.beginPath();
        // Starting point of the checkmark (bottom-left of the checkmark)
        const startX = size * 0.3;
        const startY = size * 0.55;
        
        // Mid-point of the checkmark
        const midX = size * 0.45;
        const midY = size * 0.7;
        
        // End point of the checkmark (top-right of the checkmark)
        const endX = size * 0.7;
        const endY = size * 0.4;
        
        // Draw the first part of the checkmark (vertical line)
        if (checkProgress <= 0.5) {
          const lineProgress = checkProgress * 2;
          ctx.moveTo(startX, startY);
          ctx.lineTo(startX, startY + (midY - startY) * lineProgress);
        } 
        // Draw both parts of the checkmark
        else {
          ctx.moveTo(startX, startY);
          ctx.lineTo(midX, midY);
          
          const lineProgress = (checkProgress - 0.5) * 2;
          ctx.lineTo(
            midX + (endX - midX) * lineProgress,
            midY + (endY - midY) * lineProgress
          );
        }
        
        ctx.stroke();
      }
    };

    // Animation loop
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      
      // Calculate progress (0 to 1.5 where 1.0 is circle complete and 1.5 is checkmark complete)
      progress = Math.min(elapsed / duration * 1.5, 1.5);
      
      drawCheckmark(progress);
      
      if (progress < 1.5) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [size, color]);

  return (
    <div className="flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="animate-pulse"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </div>
  );
}
