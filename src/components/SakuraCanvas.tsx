import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export interface SakuraCanvasHandle {
  burst: (x?: number, y?: number, count?: number) => void;
}

interface SakuraCanvasProps {
  density?: number;
  interactive?: boolean;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  tilt: number;
  tiltSpeed: number;
  opacity: number;
  color: string;
  petalStyle: number;
  flip: number;
  flipSpeed: number;
}

export const SakuraCanvas = forwardRef<SakuraCanvasHandle, SakuraCanvasProps>(
  ({ density = 35, interactive = true }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const petalsRef = useRef<Petal[]>([]);
    const animationFrameId = useRef<number | null>(null);
    const mousePos = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

    const petalColors = [
      'rgba(255, 255, 255, 0.95)', // pure white rose petal
      'rgba(253, 250, 245, 0.92)', // warm ivory
      'rgba(247, 242, 233, 0.88)', // off-white / jasmine
      'rgba(238, 227, 212, 0.82)', // warm beige / champagne
      'rgba(245, 238, 225, 0.90)', // soft cream
      'rgba(224, 204, 175, 0.75)', // delicate antique gold sparkle
    ];

    const createPetal = (w: number, h: number, startAtTop = true): Petal => {
      const size = Math.random() * 12 + 10;
      return {
        x: Math.random() * w,
        y: startAtTop ? -size - Math.random() * 40 : Math.random() * h,
        size,
        speedX: Math.random() * 1.5 - 0.5,
        speedY: Math.random() * 1.2 + 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        tilt: Math.random() * Math.PI,
        tiltSpeed: Math.random() * 0.04 + 0.01,
        opacity: Math.random() * 0.4 + 0.6,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        petalStyle: Math.floor(Math.random() * 3),
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.01,
      };
    };

    useImperativeHandle(ref, () => ({
      burst: (burstX, burstY, count = 60) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const targetX = burstX ?? canvas.width / 2;
        const targetY = burstY ?? canvas.height / 2;

        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const velocity = Math.random() * 8 + 3;
          const size = Math.random() * 14 + 10;
          petalsRef.current.push({
            x: targetX + (Math.random() - 0.5) * 40,
            y: targetY + (Math.random() - 0.5) * 40,
            size,
            speedX: Math.cos(angle) * velocity,
            speedY: Math.sin(angle) * velocity - 2, // slight upward impulse
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.08,
            tilt: Math.random() * Math.PI,
            tiltSpeed: Math.random() * 0.06 + 0.02,
            opacity: 0.95,
            color: petalColors[Math.floor(Math.random() * petalColors.length)],
            petalStyle: Math.floor(Math.random() * 3),
            flip: Math.random() * Math.PI,
            flipSpeed: Math.random() * 0.05 + 0.02,
          });
        }
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      // Initialize base petals
      petalsRef.current = [];
      for (let i = 0; i < density; i++) {
        petalsRef.current.push(createPetal(canvas.width, canvas.height, false));
      }

      // Draw custom organic sakura petal with notched tip
      const drawPetal = (p: Petal) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        // 3D flip effect using scale
        const scaleX = Math.cos(p.tilt);
        const scaleY = Math.sin(p.flip);
        ctx.scale(scaleX, scaleY);

        ctx.fillStyle = p.color;
        ctx.shadowColor = 'rgba(255, 182, 193, 0.4)';
        ctx.shadowBlur = 4;
        ctx.globalAlpha = p.opacity;

        ctx.beginPath();
        // Characteristic curved sakura petal with notch
        const s = p.size;
        ctx.moveTo(0, s * 0.5);
        ctx.bezierCurveTo(s * 0.4, s * 0.2, s * 0.6, -s * 0.2, s * 0.2, -s * 0.5);
        // Tip notch
        ctx.lineTo(0, -s * 0.35);
        ctx.lineTo(-s * 0.2, -s * 0.5);
        ctx.bezierCurveTo(-s * 0.6, -s * 0.2, -s * 0.4, s * 0.2, 0, s * 0.5);
        ctx.closePath();
        ctx.fill();

        // Delicate inner vein highlight for depth
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.35);
        ctx.quadraticCurveTo(0, -s * 0.1, 0, -s * 0.25);
        ctx.stroke();

        ctx.restore();
      };

      let lastTime = performance.now();

      const animate = (time: number) => {
        const delta = Math.min((time - lastTime) / 1000, 0.1);
        lastTime = time;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const currentPetals = petalsRef.current;
        const windBase = Math.sin(time * 0.0008) * 0.6 + 0.4;

        for (let i = currentPetals.length - 1; i >= 0; i--) {
          const p = currentPetals[i];

          // Gentle breeze wind drift
          p.x += (p.speedX + windBase) * (delta * 60);
          p.y += p.speedY * (delta * 60);

          // Natural rotation & fluttering
          p.rotation += p.rotationSpeed * (delta * 60);
          p.tilt += p.tiltSpeed * (delta * 60);
          p.flip += p.flipSpeed * (delta * 60);

          // Interaction with mouse/touch
          if (interactive && mousePos.current.active) {
            const dx = p.x - mousePos.current.x;
            const dy = p.y - mousePos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              const force = (120 - dist) / 120;
              p.x += (dx / dist) * force * 4;
              p.y += (dy / dist) * force * 4;
            }
          }

          drawPetal(p);

          // Check if petal leaves screen
          if (p.y > canvas.height + 30 || p.x > canvas.width + 50 || p.x < -50) {
            // Keep steady density, remove burst extras
            if (currentPetals.length > density) {
              currentPetals.splice(i, 1);
            } else {
              currentPetals[i] = createPetal(canvas.width, canvas.height, true);
            }
          }
        }

        animationFrameId.current = requestAnimationFrame(animate);
      };

      animationFrameId.current = requestAnimationFrame(animate);

      const handleMouseMove = (e: MouseEvent) => {
        mousePos.current = { x: e.clientX, y: e.clientY, active: true };
      };

      const handleMouseLeave = () => {
        mousePos.current.active = false;
      };

      if (interactive) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
      }

      return () => {
        window.removeEventListener('resize', handleResize);
        if (interactive) {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseleave', handleMouseLeave);
        }
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
      };
    }, [density, interactive]);

    return (
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30 w-full h-full"
        style={{ mixBlendMode: 'normal' }}
      />
    );
  }
);

SakuraCanvas.displayName = 'SakuraCanvas';
