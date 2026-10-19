'use client';

/**
 * DnaHero — Hero section with authentic DNA preconcentration biosensor simulation.
 *
 * Direct scientific reflection of MNBE Lab's biosensing research:
 * - Free-floating DNA strands fluctuate thermally in microfluidic buffer.
 * - The cursor acts as an active biosensor electrode, concentrating scattered DNA strands
 *   into a tight focal plug and lighting them up via fluorescence (e.g. SYBR / quantum dots).
 * - Clicking flushes fresh DNA strands into the fluid space.
 */

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { createDnaSensorField, type DnaSensorOptions } from './dnaSensorField';

type DnaHeroProps = DnaSensorOptions & {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function DnaHero({
  children,
  className,
  style,
  ...options
}: DnaHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optionsKey = JSON.stringify(options);

  useEffect(() => {
    if (!sectionRef.current || !canvasRef.current) return;
    const field = createDnaSensorField(
      canvasRef.current,
      sectionRef.current,
      JSON.parse(optionsKey)
    );
    return () => field.destroy();
  }, [optionsKey]);

  return (
    <section
      ref={sectionRef}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
        minHeight: '100svh',
        background: options.background ?? '#06020e',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      {children}
    </section>
  );
}
