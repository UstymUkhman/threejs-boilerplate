export const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);

export const camelCase = (str: string): string =>
  str.split(' ').map((str, s) => (s && capitalize(str)) || str).join('');
