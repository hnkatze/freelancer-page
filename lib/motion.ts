/**
 * Shared motion primitives — keeps cubic-bezier tuples correctly typed
 * for Motion v12 (which rejects plain `number[]` as an Easing).
 */

export const EASE_EXPO_OUT: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

export const EASE_EXPO_IN: [number, number, number, number] = [
  0.7, 0, 0.84, 0,
];

export const EASE_SPRING: [number, number, number, number] = [
  0.34, 1.56, 0.64, 1,
];
