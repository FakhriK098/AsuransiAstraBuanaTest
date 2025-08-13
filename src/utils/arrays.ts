export const intersectArrays = (...arrays: string[][]): string[] => {
  return arrays.reduce((acc, arr) => acc.filter(item => arr.includes(item)));
};
