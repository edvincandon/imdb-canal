export const isValidYear = (str: string) => str.length === 4 && /^\d+$/.test(str);

export function formatValues<T>(source: T): T {
  return (Object.entries(source).reduce((obj, [key, val]) => ({ ...obj, [key]: val ? `"${val}"` : null }), {}) as T);
}
