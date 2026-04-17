"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

interface MagneticProps {
  children: ReactNode;
  /** How far the element travels toward the cursor, as a fraction of distance. Default: 0.3 */
  strength?: number;
  /** Radius in px within which the magnetic effect activates. Default: 80 */
  range?: number;
  className?: string;
}

/**
 * Wrap a Button or CTA to make it magnetically follow the cursor.
 * No-op for reduced-motion users.
 */
export function Magnetic({
  children,
  strength = 0.3,
  range = 80,
  className,
}: MagneticProps) {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { damping: 20, stiffness: 200 });
  const y = useSpring(rawY, { damping: 20, stiffness: 200 });

  useEffect(() => {
    if (shouldReduce) return;

    function handleMove(e: PointerEvent) {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < range) {
        rawX.set(dx * strength);
        rawY.set(dy * strength);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    }

    function handleReset() {
      rawX.set(0);
      rawY.set(0);
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleReset);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleReset);
      rawX.set(0);
      rawY.set(0);
    };
  }, [shouldReduce, strength, range, rawX, rawY]);

  if (shouldReduce) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
