import { consoleLog, getVersion } from './module';

export function version(current: string): string {
  return getVersion(current);
}

export function print(message: string): void {
  consoleLog(message);
};

export function add (x: i32, y: i32): i32 {
  return x + y;
}

export function fib (n: i32): i32 {
  let t: i32;
  let a: i32 = 0;
  let b: i32 = 1;

  for (let i: i32 = 0; i < n; i++) {
    t = a + b;
    a = b;
    b = t;
  }

  return b;
}

export function fact (n: i32): i32 {
  if (n < 0)  return -1;
  else if (n === 0) return 1;
  else return (n * fact(n - 1));
}
