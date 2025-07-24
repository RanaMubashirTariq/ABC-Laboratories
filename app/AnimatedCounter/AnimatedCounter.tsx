'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  targetNumber: number;
  duration?: number;
  className?: string;
  suffix?: string;
  suffixClassName?: string; // ✅ NEW
}


export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  targetNumber,
  duration = 2000,
  className = '',
  suffix,
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCount();
          setHasAnimated(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCount = () => {
    const start = 0;
    const end = targetNumber;
    const stepTime = 1000 / 60; // 60 FPS
    const totalSteps = Math.floor(duration / stepTime);
    let currentStep = 0;

    const counter = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      const current = Math.floor(progress * (end - start) + start);
      setCount(current);

      if (currentStep >= totalSteps) {
        clearInterval(counter);
        setCount(end);
      }
    }, stepTime);
  };

  const formattedNumber = count.toLocaleString();

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <span>{formattedNumber}</span>
      {suffix && (
        <span className="absolute -top-1 -right-3 text-[18px] text-muted-foreground">
          {suffix}
        </span>
      )}
    </div>
  );
};
