type DeepReadonly<T> = T extends (...args: Array<unknown>) => unknown ? T : { readonly [P in keyof T]: DeepReadonly<T[P]> };

declare function Freeze<T extends (...args: Array<unknown>) => unknown>(f: T): T;
declare function Freeze<T>(a: T[]): ReadonlyArray<DeepReadonly<T>>;
declare function Freeze<T>(o: T): DeepReadonly<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deepFreeze: typeof Freeze = (object: any): DeepReadonly<any> => {
  Object.freeze(object);

  const proprieties = Object.getOwnPropertyNames(object);

  for (const name in proprieties) {
    const value = object[proprieties[name]];
    const canFreeze = typeof value === 'object' || typeof value === 'function';

    if (value && canFreeze && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }

  return object;
};

export default deepFreeze;
