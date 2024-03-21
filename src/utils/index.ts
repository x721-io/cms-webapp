export const sanitizeObject = (obj: Record<string, any>) => {
  const _obj = { ...obj };
  Object.entries(_obj).forEach(([key, value]) => {
    if (
      value === undefined ||
      value === null ||
      value === false ||
      value === ""
    )
      delete _obj[key];
  });

  return _obj;
};
