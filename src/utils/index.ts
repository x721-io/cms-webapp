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

export const parseQueries = (queries?: Record<string, any> | undefined) => {
  if (!queries) {
    return "";
  }
  return (
    "?" +
    Object.entries(queries)
      .filter(([_, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== null && value !== undefined && value !== "";
      })
      .map(([key, value]) => `${key}=${value}`)
      .join("&")
  );
};
