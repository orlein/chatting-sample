function transformObjectKeyFromSnakeToCamel(object) {
  if (object === null) {
    return object;
  }

  if (typeof object !== "object") {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map(transformObjectKeyFromSnakeToCamel);
  }

  const newObject = {};

  Object.keys(object).forEach((key) => {
    const newKey = key.replace(/([-_][a-z])/gi, (match) => {
      return match.toUpperCase().replace("-", "").replace("_", "");
    });
    newObject[newKey] = transformObjectKeyFromSnakeToCamel(object[key]);
  });

  return newObject;
}

module.exports = transformObjectKeyFromSnakeToCamel;
