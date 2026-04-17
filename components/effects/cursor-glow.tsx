"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Subtle violet radial-gradient glow that follows the cursor.
 * Renders only on fine-pointer devices (mouse) and respects
 * the user's reduced-motion preference.
 *
 * Mount once at the app root.
 */

/** `true` once we're on the client — SSR-safe, no setState-in-effect warning. */
function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/** `true` when the primary pointer is fine (mouse / trackpad). */
function useIsFinePointer(): boolean {
  const subscribe = (onChange: () => void) => {
    if (typeof window === "undefined") return () => {};
    const mql = window.matchMedia("(pointer: fine)");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
  const getSnapshot = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches;
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function CursorGlow() {
  const isClient = useIsClient();
  const isFine = useIsFinePointer();
  const shouldReduce = useReducedMotion();
  const { resolvedTheme } = useTheme();

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const springX = useSpring(mouseX, { damping: 40, stiffness: 600, mass: 0.4 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 600, mass: 0.4 });

  const enabled =
    isClient && isFine && !shouldReduce && resolvedTheme === "dark";

  useEffect(() => {
    if (!enabled) return;

    function handleMove(e: PointerEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }

    function handleLeave() {
      mouseX.set(-9999);
      mouseY.set(-9999);
    }

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        position: "fixed",
        top: 0,
        left: 0,
        width: "20rem",
        height: "20rem",
        borderRadius: "9999px",
        background:
          "radial-gradient(circle, oklch(0.58 0.22 280 / 0.18) 0%, transparent 65%)",
        pointerEvents: "none",
        zIndex: 40,
        willChange: "transform",
      }}
    />
  );
}
