import { useEffect, useRef } from 'react';

interface PixelBlastBackgroundProps {
  color?: string;
  pixelSize?: number;
  patternScale?: number;
  patternDensity?: number;
  pixelSizeJitter?: number;
  speed?: number;
  opacity?: number;
}

function hash(value: number) {
  const x = Math.sin(value * 127.1) * 43758.5453123;
  return x - Math.floor(x);
}

export default function PixelBlastBackground({
  color = '#dddddf',
  pixelSize = 3,
  patternScale = 4,
  patternDensity = 1.35,
  pixelSizeJitter = 0.2,
  speed = 1.6,
  opacity = 1,
}: PixelBlastBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const parent = canvas.parentElement;
    if (!parent) {
      return;
    }

    const spacing = Math.max(9, (pixelSize * patternScale) / Math.max(0.8, patternDensity));
    const drift = spacing * 0.12;
    const draw = (time: number) => {
      const t = (time / 1000) * speed;

      context.clearRect(0, 0, width, height);
      context.fillStyle = color;

      const cols = Math.ceil(width / spacing) + 3;
      const rows = Math.ceil(height / spacing) + 3;

      for (let row = -1; row < rows; row += 1) {
        for (let col = -1; col < cols; col += 1) {
          const seed = row * 1000 + col;
          const phase = hash(seed) * Math.PI * 2;
          const phaseY = hash(seed + 17) * Math.PI * 2;
          const jitter = (hash(seed + 29) - 0.5) * pixelSize * pixelSizeJitter;
          const radius = Math.max(0.6, pixelSize / 2 + jitter);
          const alpha = 0.22 + hash(seed + 7) * 0.24;

          const x = (col + 0.5) * spacing + Math.sin(t + phase) * drift;
          const y = (row + 0.5) * spacing + Math.cos(t * 0.92 + phaseY) * drift;

          context.globalAlpha = alpha * opacity;
          context.beginPath();
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.fill();
        }
      }
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new ResizeObserver(() => resize());
    observer.observe(parent);
    resize();

    const animate = (time: number) => {
      draw(time);
      animationFrame = window.requestAnimationFrame(animate);
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [color, opacity, patternDensity, patternScale, pixelSize, pixelSizeJitter, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
