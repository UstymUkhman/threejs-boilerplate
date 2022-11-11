type Callback = (...args: unknown[]) => void;

export function debounce(cb: Callback, delay: number, leading = true): Callback
{
	let timeout: NodeJS.Timeout | undefined;

	return (...args) => {
    clearTimeout(timeout);
    leading && !timeout && cb(...args);

		timeout = setTimeout(() => {
      !leading && cb(...args);
      timeout = undefined;
    }, delay);
	};
}

export function throttle (cb: Callback, limit: number): Callback
{
  let last: number, timeout: NodeJS.Timeout;

  return (...args) => {
    const now = Date.now();

    if (!last) { cb(...args); last = now; }

    else {
      clearTimeout(timeout);
      const delay = limit - (now - last);

      timeout = setTimeout(() => {
        const delay = Date.now() - last;
        if (delay < limit) return;

        last = Date.now();
        cb(...args);
      }, delay);
    }
  };
}
