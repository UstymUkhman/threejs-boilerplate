export const capitalize = (s: string): string =>
  s.charAt(0).toLocaleUpperCase() + s.slice(1);

export const camelCase = (str: string): string =>
  str.split(' ')
    .map(str => str.toLocaleLowerCase())
    .map((str, s) => (s && capitalize(str)) || str)
    .join('');
