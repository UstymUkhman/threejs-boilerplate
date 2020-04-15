export function clamp (value: i32, min: i32 = 0, max: i32 = 1): f64 {
  return Math.max(min, Math.min(value, max));
}

export function mix (value1: i32, value2: i32, percent: i32): i32 {
  return value1 * (1 - percent) + value2 * percent;
}

export function fibonacci (value: i32): i32 {
  return value < 2 ? 1 : fibonacci(--value) + fibonacci(value - 1);
}

export function smoothstep (min: i32, max: i32, value: i32): f64 {
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

export function map (value: i32, min: i32, max: i32): f64 {
  return clamp((value - min) / (max - min), 0, 1);
}

export function lerp (v0: i32, v1: i32, t: i32): i32 {
  return v0 + t * (v1 - v0);
}

export function factorial (value: i32): i32 {
  if (value > 0) return value * factorial(value - 1);
  else if (value === 0) return 1;
  else return -1;
}

export function random (min: i32, max: i32): f64 {
  return Math.random() * (max - min) + min;
}
