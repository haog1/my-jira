export const isFalseValue = (val: any) => (val === 0 ? false : !val);

export const cleanObject = (obj: object) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    //@ts-ignore
    const val = result[key];
    if (isFalseValue(val)) {
      //@ts-ignore
      delete result[key];
    }
  });
  return result;
};
