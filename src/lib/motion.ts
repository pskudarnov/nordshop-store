export const motionTiming = {
  fast: 0.18,
  base: 0.28,
  slow: 0.4,
} as const;

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const hoverLift = {
  whileHover: { y: -2 },
  transition: { type: "spring", stiffness: 210, damping: 26 },
} as const;

export const fadeUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: motionTiming.base, ease: motionEase },
} as const;
