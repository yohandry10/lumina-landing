import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  to: number;
  duration?: number;
  suffix?: string;
};

export function CountUp({ to, duration = 1200, suffix = "" }: CountUpProps) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));

      if (progress < 1) {
        rafRef.current = window.requestAnimationFrame(animate);
      }
    };

    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [to, duration]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}
