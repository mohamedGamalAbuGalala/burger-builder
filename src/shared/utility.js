export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) return true;
    if (rules.required) isValid &= value.trim() !== "";
    if (rules.minLength) isValid &= value.length >= rules.minLength;
    if (rules.maxLength) isValid &= value.length <= rules.maxLength;
    if (rules.isEmail)
      isValid &= /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        value
      );
    if (rules.isNumeric) isValid &= /^\d+$/.test(value);

    return Boolean(isValid);
  };