export const isNonEmptyString = (s: string) => Boolean(s.trim());

export const isValidMonetaryString = (s: string) => new RegExp(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/g).test(s);

export const stringSorter = (asc: boolean) => (a: string, b: string) => {
  const result = a.localeCompare(b);
  return asc ? result : -result;
}

export const booleanSorter = (asc: boolean) => (a: boolean, b: boolean) => {
  if (a === b) {
    return 0;
  }

  if (a && !b) {
    return asc ? -1 : 1;
  }

  // b must be true and a must be false here
  return asc ? 1 : -1;
}

export const stringNumberSorter = (asc: boolean) => (a: string, b: string) => {
  const aAsNum = Number(a);
  const bAsNum = Number(b);

  if (aAsNum === bAsNum) {
    return 0;
  }

  if (aAsNum > bAsNum) {
    return asc ? 1 : -1;
  }

  // b > a
  return asc ? -1 : 1;
}

export default {
  booleanSorter,
  isNonEmptyString,
  isValidMonetaryString,
  stringSorter,
}