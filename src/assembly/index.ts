declare function log (message: string): void;

export function version (current: string): string {
  return 'v' + current;
}

export function print (message: string): void {
  log(message);
};

export * from './number'
